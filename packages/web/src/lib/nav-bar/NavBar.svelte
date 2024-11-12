<script lang="ts">
  import './nav-bar.css';
  import Logo from '$lib/icon/logo.svg?component';

  type Props = {
    user: App.Locals['user'] | null,
  }

  let { user }: Props = $props();
</script>

<div class="navbar">
    <div class="navbar__logo-wrapper">
        <a href="/" class="navbar__logo">
            <Logo />
        </a>
    </div>

    <div class="navbar__buttons">
        <!-- <Icon name="shopping-cart" size="24px" />
        <Icon name="bell" size="24px" /> -->

        {#if user}
            <div class="dropdown dropdown-end">
                <div tabIndex="0" role="button" class="w-10 h-10 rounded-full bg-light-blue flex items-center justify-center">
                    <span class="text-secondary font-medium">{user.firstName.charAt(0)}{user.lastName.charAt(0)}</span>
                </div>
                <ul
                tabIndex="0"
                class="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow border border-gray-200">
                <li class="hover:bg-gray-100 rounded-lg">
                    <a href="/settings" class="flex items-center gap-2 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                    </svg>
                    Settings
                    </a>
                </li>
                <div class="divider my-1"></div>
                <li>
                    <form method="post" action="/logout">
                        <button type="submit" class="flex items-center gap-2 py-2 text-red-600">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm4.707 6.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 13H16a1 1 0 100-2H6.414l1.293-1.293z" clip-rule="evenodd" />
                            </svg>
                            Logout
                        </button>
                    </form>
                </li>
                </ul>
            </div>
        {:else}
            <a href="/login" class="btn btn-primary px-6 font-medium transition-all hover:opacity-90 hover:shadow-md">Log in</a>
        {/if}
    </div>
</div>
