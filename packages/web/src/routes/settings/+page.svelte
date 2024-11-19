<script>
	import { InputText } from "@onlydevs/ui";

  let { data } = $props();
  let { user } = data;

</script>

<div class="min-h-screen p-4">
  <div class="max-w-2xl mx-auto space-y-8 py-8">
    <section class="card shadow-2xl">
      <div class="card-body">
        <h2 class="card-title text-2xl text-success font-bold mb-4">Profile</h2>
        
        <form method="POST" action="?/updateProfile" class="space-y-4">
            <InputText label="E-Mail" name="email" value={user.email} />
            <InputText label="First Name" name="firstName" value={user.firstName} />
            <InputText label="Last Name" name="lastName" value={user.lastName} />
            <InputText label="UCO" name="uco" value={user.uco} />

            <button class="btn btn-primary btn-block hover:brightness-110" type="submit">
              Save Changes
            </button>
        </form>
      </div>
    </section>

    <section class="card shadow-2xl">
      <div class="card-body">
        <h2 class="card-title text-2xl text-success font-bold mb-4">Password</h2>
        
        <form method="POST" action="?/updatePassword" class="space-y-4">
          <InputText label="New Password" name="newPassword" type="password" />

          <button class="btn btn-primary btn-block hover:brightness-110" type="submit">
            Update Password
          </button>
        </form>
      </div>
    </section>
  </div>
</div>