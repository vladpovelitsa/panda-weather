<template>
  <article class="city-card">
    <button class="city-card__toggle">
      {{ $t('card.byDay') }}
    </button>
    <button class="city-card__fav">
      {{ $t('card.toFav') }}
    </button>
    <h2 class="city-card__name">
      Харків
    </h2>

    <div class="city-card__info">
      <p class="city-card__row city-card__row_main">
        <span class="city-card__icon"></span>
        <span class="city-card__temp">11 °C </span>
        <span class="city-card__feels">
          (Feels like 10°C. )
        </span>
        <strong class="city-card__summary"> Overcast clouds. Gentle Breeze</strong>
      </p>
      <p class="city-card__row">
        3.6m/s N
      </p>
      <p class="city-card__row">
        Humidity: 83%
      </p>
      <p class="city-card__row">
        Dew point: 8°C
      </p>
      <p class="city-card__row">
        1022hPa
      </p>
      <p class="city-card__row">
        UV: 0
      </p>
      <p class="city-card__row">
        Visibility: 10.0km
      </p>
    </div>

  </article>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.city-card {
  padding: 20px 30px;
  position: relative;
  border-radius: 20px;
  box-shadow: var(--box-shadow);
  background: #fff;

  &__toggle,
  &__fav {
    position: absolute;
    top: 0;
  }

  &__toggle {
    left: 30px;
  }

  &__fav {
    right: 30px;
  }

  &__info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  &__row {
    margin: 0;

    &_main {
      grid-column: 1 / -1;
    }
  }

  &__summary {
    width: 100%;
    margin-top: 15px;
    display: block;
  }
}
</style>