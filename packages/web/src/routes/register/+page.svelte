<script lang="ts">
    import { enhance } from '$app/forms';
	import { InputText } from '@onlydevs/ui';

    let errors: Record<string, string> = {};
    let submitting = false;
</script>

<div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full space-y-8 p-8 border border-primary rounded-lg shadow">
        <h2 class="text-center text-white text-3xl font-bold">Create an account</h2>
        
        <form method="POST" action="?/register" use:enhance={(...args) => {
            submitting = true;
            return async ({ result, update }) => {
                submitting = false;
                if (result.type === 'failure') {
                    errors = result.data?.errors as Record<string, string>;
                }
                await update({reset: true});
            };
        }}>
            <InputText name="email" class="mb-4" label="Email" error={errors['email']} type="email" />
            <InputText name="username" class="mb-4" label="Username" error={errors['username']} />
            <InputText name="password" class="mb-4" label="Password" error={errors['password']} type="password" />
            <InputText name="firstName" class="mb-4" label="First Name" error={errors['firstName']} />
            <InputText name="lastName" class="mb-4" label="Last Name" error={errors['lastName']} />
            <InputText name="uco" class="mb-4" label="UCO" error={errors['uco']} />
            <button
                type="submit"
                    disabled={submitting}
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-green hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green disabled:opacity-50"
                >
                    {submitting ? 'Creating account...' : 'Create account'}
            </button>
        </form>

        <div class="text-center">
            <a href="/login" class="text-sm text-white hover:text-primary-green">
                Already have an account? Sign in
            </a>
        </div>
    </div>
</div>
