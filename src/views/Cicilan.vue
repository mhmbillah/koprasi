<template>
  <div class="cicilan-list__container">
    <v-card class="elevation-2" width="100%">
      <v-container>
        <Loading v-if="isLoading"></Loading>
        <v-data-table
          :headers="headers"
          :items="items"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-btn color="primary" dark class="mb-2" @click="showAddDialog"
                >Tambahkan Cicilan</v-btn
              >
              <v-spacer></v-spacer>
              <v-text-field
                hide-details
                append-icon="mdi-magnify"
                single-line
                v-model="searchKeyword"
                placeholder="Cari nama anggota"
                clearable
                @keyup.enter="search"
                @click:clear="resetKeyword"
              ></v-text-field>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="showEditDialog(item)">
              mdi-square-edit-outline
            </v-icon>
            <v-icon small @click="deleteItem(item)">
              mdi-delete-outline
            </v-icon>
          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination
            v-model="page"
            :length="pageCount"
            total-visible="7"
            @input="goto(page)"
          ></v-pagination>
        </div>
      </v-container>
      <v-dialog v-model="visibleDialog" max-width="500">
        <v-card>
          <v-card-title
            ><span class="title">{{ formTitle }}</span></v-card-title
          >
          <v-card-text>
            <v-select
              label="Anggota"
              v-model="editedItem.no"
              :items="anggotaSelection"
              :readonly="!!selectedItem"
            ></v-select>
            <v-select
              label="Bulan"
              v-model="editedItem.month"
              :items="month"
            ></v-select>
            <v-text-field
              label="Tahun"
              v-model="editedItem.year"
              type="number"
            ></v-text-field>
            <v-card-actions>
              <v-btn
                color="primary"
                outlined
                class="mb-2"
                width="50%"
                @click="visibleDialog = false"
                >Batal</v-btn
              >
              <v-btn
                color="primary"
                class="mb-2"
                @click="save"
                width="50%"
                :disabled="!valid"
                >Simpan</v-btn
              >
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-dialog>
      <ConfirmDialog
        title="Menghapus Layar"
        :message="`Apakah anda yakin menghapus layar  ?`"
        :visible="visibleConfirmDialog"
        @cancel="
          visibleConfirmDialog = false;
          selectedItem = {};
        "
        @confirm="confirmDelete"
      ></ConfirmDialog>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
.cicilan-list__container {
  height: 100%;
  width: 100%;
  padding: 20px;
  .welcome {
    margin-bottom: 30px;
    .v-card__text {
      display: flex;
      align-items: center;
    }
    p {
      margin: auto 0;
    }
    &__username {
      color: #0095da;
    }
  }
}
</style>

<script>
import { mapActions } from "vuex";
const Loading = () => import("@/components/common/Loading.vue");
const ConfirmDialog = () => import("@/components/common/ConfirmDialog.vue");

import CONSTANT from "@/constant";

export default {
  components: { Loading, ConfirmDialog },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      visibleDialog: false,
      searchKeyword: "",
      isLoading: false,
      default: {
        no: "",
        month: "",
        year: ""
      },
      editedItem: {
        no: "",
        month: "",
        year: ""
      },
      visibleConfirmDialog: false,
      month: CONSTANT.MONTH,
      items: [],
      selectedItem: null,
      visibleMenu: false,
      headers: [
        {
          text: "Anggota",
          align: "start",
          sortable: false,
          value: "anggota.name"
        },
        {
          text: "RW",
          sortable: false,
          value: "anggota.rw"
        },
        {
          text: "Pokok",
          value: "pokok",
          sortable: false
        },
        {
          text: "Jasa",
          value: "jasa",
          sortable: false
        },
        {
          text: "Bulan",
          value: "month",
          sortable: false
        },
        {
          text: "Tahun",
          value: "year",
          sortable: false
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false
        }
      ],
      anggota: []
    };
  },
  methods: {
    ...mapActions("cicilan", [
      "getCicilan",
      "addCicilan",
      "deleteCicilan",
      "editCicilan"
    ]),
    ...mapActions("anggota", ["getAnggota"]),
    showAddDialog() {
      this.editedItem = Object.assign({}, this.default);
      this.visibleDialog = true;
    },
    showEditDialog(item) {
      this.selectedItem = item;
      // this.editedItem = Object.assign({}, this.selectedItem);
      this.editedItem.no = this.selectedItem.anggota.no;
      this.editedItem.type = this.selectedItem.type;
      this.editedItem.nominal = this.selectedItem.nominal;
      this.editedItem.month = this.selectedItem.month;
      this.editedItem.year = this.selectedItem.year;
      this.visibleDialog = true;
    },
    fetchCicilanList() {
      this.isLoading = true;
      this.getCicilan({
        data: {
          page: this.page,
          name: this.keyword,
          size: this.itemsPerPage
        },
        success: this.handleSucces,
        fail: this.handleFail
      });
    },
    handleSucces({ data }) {
      this.isLoading = false;
      this.items = data.content;
      console.log(this.items);

      this.page = data.pagination.page;
      this.pageCount = data.pagination.totalData;
    },
    handleFail(error) {
      this.isLoading = false;
      this.$toast.open({
        message: error,
        type: "error",
        position: "top"
      });
    },
    fetchAnggotaList() {
      this.isLoading = true;
      this.getAnggota({
        data: {
          data: {
            page: 1,
            pageSize: 999
          }
        },
        success: this.handleAnggotaSucces,
        fail: this.handleFail
      });
    },
    handleAnggotaSucces({ data }) {
      this.isLoading = false;
      this.anggota = data.content;
      console.log(this.anggota);
    },
    save() {
      if (!this.selectedItem) {
        this.addCicilan({
          data: this.editedItem,
          success: this.handleAddSucces,
          fail: this.handleAddFail
        });
      } else {
        this.editCicilan({
          data: {
            id: this.selectedItem.id,
            data: this.editedItem
          },
          success: this.handleEditSucces,
          fail: this.handleAddFail
        });
      }
    },
    handleAddSucces() {
      this.fetchCicilanList();
      this.$toast.open({
        message: "Success Add data",
        type: "success",
        position: "top"
      });
      this.visibleDialog = false;
    },
    handleEditSucces() {
      this.fetchCicilanList();
      this.$toast.open({
        message: "success edit data",
        type: "success",
        position: "top"
      });
      this.visibleDialog = false;
    },
    handleAddFail(error) {
      this.$toast.open({
        message: error,
        type: "error",
        position: "top"
      });
      this.visibleDialog = false;
    },
    search() {
      this.$router.push({
        query: Object.assign({}, this.$route.query, {
          keyword: this.searchKeyword
        })
      });
    },
    deleteItem(item) {
      this.selectedItem = item;
      this.visibleConfirmDialog = true;
    },
    confirmDelete() {
      this.deleteCicilan({
        data: {
          id: this.selectedItem.id
        },
        success: this.handleDeleteSucces,
        fail: this.handleDeleteFail
      });
    },
    handleDeleteSucces() {
      console.log("success");

      this.fetchCicilanList();
      this.visibleConfirmDialog = false;
      this.$toast.open({
        message: "Data Has Been deleted",
        type: "success",
        position: "top"
      });
    },
    handleDeleteFail(error) {
      this.visibleConfirmDialog = false;
      this.$toast.open({
        message: error,
        type: "error",
        position: "top"
      });
    },
    goto(page) {
      this.$router.push({
        query: Object.assign({}, this.$route.query, {
          page: page
        })
      });
    },
    resetKeyword() {
      this.$router.push({
        query: {
          keyword: "",
          page: 1
        }
      });
    }
  },
  computed: {
    keyword() {
      return this.$route.query.keyword || "";
    },
    pageQuery() {
      return this.$route.query.page || 1;
    },
    formTitle() {
      return this.selectedItem ? "Edit Cicilan" : "Tambahkan Cicilan";
    },
    valid() {
      return (
        !!this.editedItem.no &&
        !!this.editedItem.month &&
        !!this.editedItem.year
      );
    },
    anggotaSelection() {
      return this.anggota.map(item => {
        return { text: item.name, value: item.no };
      });
    }
  },
  watch: {
    visibleDialog(value) {
      if (!value) {
        this.selectedItem = null;
      }
    },
    visibleConfirmDialog(value) {
      if (!value) {
        this.selectedItem = null;
      }
    }
  },
  mounted() {
    this.searchKeyword = this.keyword;
    this.page = parseInt(this.pageQuery);
    this.fetchCicilanList();
    this.fetchAnggotaList();
  }
};
</script>
