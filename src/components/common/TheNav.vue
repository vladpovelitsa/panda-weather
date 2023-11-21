<template>
  <nav class="nav">
    <ul class="nav__list">
      <li>
        <router-link class="nav__link" :to="Tr.i18nRoute({name: 'home'})">{{ $t('nav.home') }}</router-link>
      </li>
      <li>
        <router-link class="nav__link" :to="Tr.i18nRoute({name: 'my-locations'})">{{
            $t('nav.my-locations')
          }}
        </router-link>
      </li>
    </ul>

    <input type="search" list="citiesList" v-model="city" @input="getTheCitiesList">

    <datalist id="citiesList">
      <option v-for="city in testList" :key="city.terms[0].value">
        {{ city.description }}
      </option>
    </datalist>

    <TheLangSwitcher/>

  </nav>
</template>

<script setup>
import Tr from "@/i18n/translation";
import TheLangSwitcher from "@/components/common/TheLangSwitcher.vue";
import {ref} from "vue";
import {useI18n} from "vue-i18n";

const city = ref('')
const i18n = useI18n()
const testList = [
  {
    "description": "Харків, Kharkiv Oblast, Ukraine",
    "matched_substrings": [
      {
        "length": 6,
        "offset": 0
      }
    ],
    "place_id": "ChIJiw-rY5-gJ0ERCr6kGmgYTC0",
    "reference": "ChIJiw-rY5-gJ0ERCr6kGmgYTC0",
    "structured_formatting": {
      "main_text": "Харків",
      "main_text_matched_substrings": [
        {
          "length": 6,
          "offset": 0
        }
      ],
      "secondary_text": "Kharkiv Oblast, Ukraine"
    },
    "terms": [
      {
        "offset": 0,
        "value": "Харків"
      },
      {
        "offset": 8,
        "value": "Kharkiv Oblast"
      },
      {
        "offset": 24,
        "value": "Ukraine"
      }
    ],
    "types": [
      "locality",
      "political",
      "geocode"
    ]
  },
  {
    "description": "Харківці, Poltava Oblast, Ukraine",
    "matched_substrings": [
      {
        "length": 6,
        "offset": 0
      }
    ],
    "place_id": "ChIJp458vBER1kARQFJTDtFTLbo",
    "reference": "ChIJp458vBER1kARQFJTDtFTLbo",
    "structured_formatting": {
      "main_text": "Харківці",
      "main_text_matched_substrings": [
        {
          "length": 6,
          "offset": 0
        }
      ],
      "secondary_text": "Poltava Oblast, Ukraine"
    },
    "terms": [
      {
        "offset": 0,
        "value": "Харківці"
      },
      {
        "offset": 10,
        "value": "Poltava Oblast"
      },
      {
        "offset": 26,
        "value": "Ukraine"
      }
    ],
    "types": [
      "locality",
      "political",
      "geocode"
    ]
  },
  {
    "description": "Харківці, Kyiv Oblast, Ukraine",
    "matched_substrings": [
      {
        "length": 6,
        "offset": 0
      }
    ],
    "place_id": "ChIJQ-Lze49b1EARAg_uOEOtc8U",
    "reference": "ChIJQ-Lze49b1EARAg_uOEOtc8U",
    "structured_formatting": {
      "main_text": "Харківці",
      "main_text_matched_substrings": [
        {
          "length": 6,
          "offset": 0
        }
      ],
      "secondary_text": "Kyiv Oblast, Ukraine"
    },
    "terms": [
      {
        "offset": 0,
        "value": "Харківці"
      },
      {
        "offset": 10,
        "value": "Kyiv Oblast"
      },
      {
        "offset": 23,
        "value": "Ukraine"
      }
    ],
    "types": [
      "locality",
      "political",
      "geocode"
    ]
  },
  {
    "description": "Харківці, Khmelnytskyi Oblast, Ukraine",
    "matched_substrings": [
      {
        "length": 6,
        "offset": 0
      }
    ],
    "place_id": "ChIJExyRoOXALUcRdBgji7IJVGw",
    "reference": "ChIJExyRoOXALUcRdBgji7IJVGw",
    "structured_formatting": {
      "main_text": "Харківці",
      "main_text_matched_substrings": [
        {
          "length": 6,
          "offset": 0
        }
      ],
      "secondary_text": "Khmelnytskyi Oblast, Ukraine"
    },
    "terms": [
      {
        "offset": 0,
        "value": "Харківці"
      },
      {
        "offset": 10,
        "value": "Khmelnytskyi Oblast"
      },
      {
        "offset": 31,
        "value": "Ukraine"
      }
    ],
    "types": [
      "locality",
      "political",
      "geocode"
    ]
  },
  {
    "description": "Харківка, Cherkasy Oblast, Ukraine",
    "matched_substrings": [
      {
        "length": 6,
        "offset": 0
      }
    ],
    "place_id": "ChIJkTZrulZB0kARyBiLbENslCg",
    "reference": "ChIJkTZrulZB0kARyBiLbENslCg",
    "structured_formatting": {
      "main_text": "Харківка",
      "main_text_matched_substrings": [
        {
          "length": 6,
          "offset": 0
        }
      ],
      "secondary_text": "Cherkasy Oblast, Ukraine"
    },
    "terms": [
      {
        "offset": 0,
        "value": "Харківка"
      },
      {
        "offset": 10,
        "value": "Cherkasy Oblast"
      },
      {
        "offset": 27,
        "value": "Ukraine"
      }
    ],
    "types": [
      "locality",
      "political",
      "geocode"
    ]
  }
]

const getTheCitiesList = async () => await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&types=locality&language=${i18n.locale.value}&input=${city.value}`)


</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 200px 1fr;
  gap: 30px;

  &__list {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 30px;
    margin: 0;
    padding: 0;
  }

  &__link {
    color: var(--accent-color);
    text-decoration: none;
    font-size: 20px;

    &:hover {
      color: var(--accent-color)
    }
  }
}
</style>