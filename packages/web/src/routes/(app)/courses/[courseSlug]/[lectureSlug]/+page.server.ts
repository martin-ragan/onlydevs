import { error } from '@sveltejs/kit';
import { markLectureAsCompleted, markLectureAsInProgress } from '../../../../../services/lectureServices';
import type { XApiActor, XApiResult } from '@onlydevs/common-types/src';
import type { XApiObject } from '@onlydevs/common-types/src';
import { sendXApiStatement } from '../../../../../services/xApiService';
import { evaluateCheckpointLecture } from '../../../../../services/checkpointService';

export async function load({ params, locals, parent }) {
    const xApiObject: XApiObject = {
        id: `${params.courseSlug}/${params.lectureSlug}`,
        definition: {
          name: { "cs-CZ": params.lectureSlug },
          type: "lecture",
        },
      };
      
    if (locals.user) {
        const actor: XApiActor = { mbox: locals.user.email };
        console.log("sending statement");
        await sendXApiStatement(actor, "Opened", xApiObject);
    }

    try {
        const {lectures} = await parent();

        // Parse the lecture content
        const lecture = lectures.find(lecture => lecture.slug === `${params.courseSlug}/${params.lectureSlug}`);
        
        if (!lecture) {
            throw error(404, 'Lecture not found');
        }

        return {
            lecture,
            user: locals.user
        };
    } catch (e) {
        throw error(404, 'Lecture not found');
    }
}


export const actions = {
    completeLecture: async (event) => {
        const courseSlug = event.params.courseSlug;
        const lectureId = event.params.lectureSlug;

        const data = await markLectureAsCompleted(event.locals.user.email, courseSlug, lectureId);

        return {
            isCompleted: data?.status === "completed"
        };
    },
    uncompleteLecture: async (event) => {
        const courseSlug = event.params.courseSlug;
        const lectureId = event.params.lectureSlug;

        const data = await markLectureAsInProgress(event.locals.user.email, courseSlug, lectureId);

        return {
            isInProgress: data?.status === "inProgress"
        };
    },
    submitCheckpointLecture: async (event) => {
        const xApiObject: XApiObject = {
            id: event.url.toString(),
            definition: {
                name: { "cs-CZ": event.params.lectureSlug },
                type: "checkpoint",
            },
        };

        const formData = await event.request.formData();
        const questions = JSON.parse(formData.get('questions') as string);
        
        const checkpointResult = await evaluateCheckpointLecture(formData, {data: {questions}});

        if (checkpointResult.totalAnswers === checkpointResult.correctAnswers) {
            await markLectureAsCompleted(event.locals.user.email, event.params.courseSlug, event.params.lectureSlug);
        }

        const actor: XApiActor = { mbox: event.locals.user.email };
        const result: XApiResult = {
            success: checkpointResult.correctAnswers === checkpointResult.totalAnswers,
            achievedScore: checkpointResult.correctAnswers,
            maxScore: checkpointResult.totalAnswers,
        };

        await sendXApiStatement(actor, "Achieved", xApiObject, result);

        return {
            checkpointResult
        };
    }
}