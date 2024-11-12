<script lang="ts">
  import './side-bar.css';
  import Icon from '$lib/icon/Icon.svelte';
  import { page } from '$app/stores';
</script>

<aside class="sidebar">
    <ul class="sidebar__list">
        <li class:active={$page.url.pathname === '/dashboard'}>
            <a href="/dashboard">
                <Icon name="home" size="18px" />
            </a>
        </li>
        <li class:active={$page.url.pathname === '/courses'}>
            <a href="/courses">
                <Icon name="book-open" size="18px" />
            </a>
        </li>
    </ul>
</aside>
