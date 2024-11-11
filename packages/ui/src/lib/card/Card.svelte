<script lang="ts">
    import './card.css';

    interface Props {
        badges: string[];
        image: string;
        price: number;
        title: string;
        description: string;
        class?: string;
    }

    let { badges = [], title, image, price, description, class: klass }: Props = $props();
</script>
<div class={["card__container", klass].join(' ')}>
    <figure>
        <img
                src={image}
                alt="Shoes" />
    </figure>
    <div class="card__body">
        <h2 class="card__title">
            {title}
        </h2>
        <p class="card__description">
            {description}
        </p>
        <div class="card__actions">
            {#each badges as badge}
                <div class="card__badge">{badge}</div>
            {/each}
        </div>

        <h3 class="card__price">{price} Kč</h3>
    </div>
</div>
