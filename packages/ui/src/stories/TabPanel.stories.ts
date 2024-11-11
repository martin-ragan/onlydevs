// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
import TabPanel from "$lib/tab-panel/TabPanel.svelte";

export default {
  title: 'Components/TabPanel',
  component: TabPanel,
  tags: ['autodocs'],
  argTypes: {},
};


export const Primary = {
  args: {
    tabs: [
      { label: 'Overview', id: 'overview' },
      { label: 'Course', id: 'course' },
      { label: 'Assignments', id: 'assignments'},
      { label: 'Classroom chat', id: 'chat'}
    ]
  },
};
