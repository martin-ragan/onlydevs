<script lang="ts">
  import './nav-bar.css';
  import Icon from '../icon/Icon.svelte';
  import Logo from '$lib/icon/logo.svg?component';
 
</script>

<div class="navbar">
    <div class="navbar__logo-wrapper">
        <a href="/" class="navbar__logo">
            <Logo />
        </a>
    </div>

    <div class="navbar__buttons">
        <Icon name="shopping-cart" size="24px" />
        <Icon name="bell" size="24px" />

        <button type="button" class="navbar__button navbar_button--avatar">
            <span>MR</span>
        </button>
    </div>
</div>
