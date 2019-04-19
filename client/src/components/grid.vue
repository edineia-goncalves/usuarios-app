<template>
  <div class="grid-template">
    <nav class="level level-right">
      <div>
        <input
          name="query"
          class="input"
          v-model="searchQuery"
          placeholder="Digite para pesquisar.."
        >
      </div>
    </nav>
    <table class="table-header">
      <thead>
        <th
          v-for="key in columns"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }"
          class="header-background"
          v-bind:key="key"
        >
          {{ key | capitalize }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></span>
        </th>
      </thead>
      
    </table>
    <table class="table-body">
      <tbody class="border-row">
        <tr v-for="entry in filteredData" :key="entry">
          <td v-for="key in columns" :key="key">{{entry[key]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Icon from "vue-awesome/components/Icon";

export default {
  name: "Mygrid",
  components: {
    Icon
  },
  props: {
    data: Array,
    columns: Array
  },
  data() {
    return {
      searchQuery: "",
      sortKey: "",
      sortOrders: {}
    };
  },
  computed: {
    filteredData: function() {
      let sortKey = this.sortKey;
      let filterKey = this.searchQuery && this.searchQuery.toLowerCase();
      let order = this.sortOrders[sortKey] || 1;
      let data = this.data;

      if (filterKey) {
        data = data.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(filterKey) > -1
            );
          });
        });
      }
      if (sortKey) {
        data = data.slice().sort(function(a, b) {
          a = a[sortKey];
          b = b[sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }
      return data;
    }
  },
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  methods: {
    sortBy: function(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    }
  },
  created() {
    let sortOrders = {};
    this.columns.forEach(function(key) {
      sortOrders[key] = 1;
    });
    this.sortOrders = sortOrders;
  }
};
</script>

<style scoped>
.header-background {
  background-color: #add8e6;
}
table {
  border-spacing: 0;
  width: 100%;
}
th {
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
td {
  border-bottom: 1px #d3d3d3 solid;
}
th,
td {
  min-width: 150px;
  padding: 10px 20px;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #000000;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #000000;
}

.grid-template {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -webkit-flex-direction: column;
  width: 100%;
}
.border-row {
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
}
</style>