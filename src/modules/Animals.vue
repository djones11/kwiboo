<template>
  <div class="animal_wrapper">
    <!-- Animal selector -->

    <div class="animal_selection_wrapper">
      <h3 class="animal_selection_header">{{ getLanguage["select_animal_header"] }}</h3>
      <div class="animal_selection_container">
        <div 
          v-for="(animal, type) in animalTypes" 
          :key="type" 
          class="animal_section_item hover"
          @click="animals.push(animalFactory(type))"
          :title="getLanguage[`add_${type}_title`]"
        >
          <span :class="`icon ${animal['icon']}`"></span>
        </div>
      </div>
    </div>

    <!-- Filter container -->

    <div class="animal_filter_wrapper">
      <FormInputField
        :msg="getLanguage['search_placeholder']"
        key="searchOperators"
        v-model="filters['search']"
        :clear="true"
        class="classic"
      />
      <FilterSelectBox
        :localSizeClass="$mq"
        icon="icon-frog"
        :setDefault="filters['type']"
        @click="updateTypeFilter"
        emptyValue="all"
        :inputOptions="typeOptions"
      />
    </div>

  <!-- Controls container -->

    <div class="animal_controls_wrapper">
      <div class="sort_container">
        <SortIcon
          icon="ABC"
          :active="sortBy == 'name'"
          value="name"
          @click="handleSort"
          :sortDir="sortDir"
          :title="getLanguage['sort_by_name']"
        />
        <SortIcon
          icon="icon-clock"
          value="creation"
          :active="sortBy == 'creation'"
          @click="handleSort"
          :sortDir="sortDir"
          :title="getLanguage['sort_by_creation']"
        />
      </div>
      <div class="view_type_container" v-if="$mq == 'desktop'">
        <span
          @click="viewType = 'small'"
          class="icon icon-bars hover"
          :class="{
            active: viewType == 'small'
          }"
          :title="getLanguage['change_to_list_view_title']"
        >
        </span>
        <span
          @click="viewType = 'large'"
          class="icon icon-th hover"
          :class="{
            active: viewType == 'large'
          }"
          :title="getLanguage['change_to_tile_view_title']"
        >
        </span>
      </div>
    </div>

    <!-- Current animals -->

    <div :class="`animal_item_container ${$mq != 'mob' ? viewType : 'small'}`">
      <AnimalItem 
        v-for="animal in filteredAnimals" 
        :key="animal['id']" 
        :animalClass="animal" 
      />
      <div class="no_items_container" v-if="filteredAnimals.length == 0">
        <h2>{{ getLanguage["no_animals_selected_info"] }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import FormInputField from "@/components/input/FormInputField";
import FilterSelectBox from "@/components/input/FilterSelectBox";
import SortIcon from "@/components/SortIcon";

import animalClasses from "@/mixins/animalClasses";

import AnimalItem from "./AnimalItem";

export default {
  data: function() {
    return {
      filters: {
        search: "",
        type: "all"
      },
      viewType: "small",
      animals: [],
      sortDir: "asc",
      sortBy: "creation"
    };
  },
  components: { AnimalItem, FormInputField, FilterSelectBox, SortIcon },
  mixins: [animalClasses],  
  computed: {
    ...mapGetters(["getLanguage"]),    
    sortedAnimals() {
      let animals = this.animals.sort((a, b) => {
        let aCol, bCol;

        aCol = a[this.sortBy];
        bCol = b[this.sortBy];

        if (this.sortDir == "asc") {
          return aCol > bCol ? 1 : -1;
        } else {
          return aCol > bCol ? -1 : 1;
        }
      });

      return animals;
    },
    filteredAnimals() {
      const searchTerm = this.filters["search"].toLowerCase();

      let animals = this.sortedAnimals.filter(x => {
        const name = x["name"].toLowerCase();
        const type = x["type"].toLowerCase();

        if(!name.startsWith(searchTerm)) return false;
        if(this.filters["type"] != "all" && type != this.filters["type"]) return false;

        return x;
      });

      return animals;
    },
    typeOptions() {
      let options = {
        all: this.getLanguage["all"]
      }

      for(let property in this.animalTypes) {
        options[property] = this.animalTypes[property]["text"]
      }

      return options;
    },
    animalTypes() {
      return {
        dog: {
          text: this.getLanguage["dog"],
          icon: "icon-dog"
        },
        cat: {
          text: this.getLanguage["cat"],
          icon: "icon-cat"
        },
        bird: {
          text: this.getLanguage["bird"],
          icon: "icon-dove"
        }
      }
    }
  },
  methods: {
    updateTypeFilter(value) {
      this.filters["type"] = value;
    },
    handleSort(filter) {
      if (this.sortBy == filter) {
        this.sortDir = this.sortDir == "desc" ? "asc" : "desc";
      } else {
        this.sortBy = filter;
        this.sortDir = "desc";
      }
    }
  }
};
</script>

<style scoped lang="scss">

$side_padding: 12px;

.animal_wrapper {
  display: flex;
  max-width: 1000px;
  width: 100%;  
  height: 100%;
  margin: auto;
  padding: 24px 0;
  flex-direction: column;
  background-color: inherit;
}
.animal_selection_wrapper {
  padding: 0 $side_padding;
}
.animal_selection_container {
  display: flex;
  justify-content: space-between;
}
.animal_selection_header {
  padding: 32px 0;
  color: $light_text_colour;
  text-align: center;
}
.animal_filter_wrapper {
  display: flex;
  padding: 24px $side_padding;
  align-items: center;
  font-size: 1.1em;

  & /deep/ .form_input_container  {
    padding-right: 12px;
  }
}
.animal_controls_wrapper {
  display: flex;
  padding: 0 $side_padding 24px $side_padding;
  justify-content: space-between;
  color: $light_text_colour;
  font-size: 1.2em;
}
.sort_container {
  display: flex;
}
.view_type_container {
  display: flex;

  .icon {
    padding-left: 18px;

    &.active {
      color: $light_green;
    }
  }
}
.animal_section_item {
  display: flex;
  padding: 1.25em;
  flex: 1;
  align-items: center;
  justify-content: center;
  font-size: calc(0.5vw + 1.5em);
  background-color: $light_grey;
  border-radius: 12px;

  &:not(:first-child) {
    margin-left: 6px;
  }

  &:not(:last-child) {
    margin-right: 6px;
  }
}
.animal_item_container {
  display: flex;
  width: 100%;
  padding: 0 $side_padding;
  flex-wrap: wrap;
  background-color: inherit;
  overflow: auto;
}
.no_items_container {
  color: $light_text_colour;
}
</style>