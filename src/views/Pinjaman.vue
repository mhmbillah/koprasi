<template>
  <div class="pinjaman-list__container">
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
                >Tambahkan Pinjaman</v-btn
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
            <v-icon small @click="editLunas(item)">
              mdi-check-outline
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
            <v-text-field
              label="Nomor anggota"
              v-model="editedItem.anggota.no"
              type="number"
            ></v-text-field>
            <v-text-field
              label="Nama anggota"
              v-model="editedItem.anggota.name"
            ></v-text-field>
            <v-text-field
              label="Rw"
              v-model="editedItem.anggota.rw"
              type="number"
            ></v-text-field>
            <v-text-field
              label="Nominal (Rp)"
              v-model="editedItem.nominal"
              type="number"
            ></v-text-field>
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
            <v-text-field
              label="Target"
              v-model="editedItem.target"
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
        title="Menghapus Pinjaman"
        :message="`Apakah anda yakin menghapus Pinjaman  ?`"
        :visible="visibleConfirmDialog"
        @cancel="
          visibleConfirmDialog = false;
          selectedItem = {};
        "
        @confirm="confirmDelete"
      ></ConfirmDialog>
      <ConfirmDialog
        title="Lunas"
        :message="`Apakah anda yakin mengubah menjadi lunas  ?`"
        :visible="visibleConfirmLunasDialog"
        @cancel="
          visibleConfirmLunasDialog = false;
          selectedItem = {};
        "
        @confirm="confirmLunas"
      ></ConfirmDialog>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
.pinjaman-list__container {
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
        anggota: {
          no: 0,
          name: "",
          rw: 0
        },
        nominal: "",
        month: "",
        year: 0,
        target: 0
      },
      editedItem: {
        anggota: {
          no: 0,
          name: "",
          rw: 0
        },
        nominal: "",
        month: "",
        year: 0,
        target: 0
      },
      visibleConfirmDialog: false,
      visibleConfirmLunasDialog: false,
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
          text: "Nominal",
          value: "nominal",
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
          text: "Target",
          value: "target",
          sortable: false
        },
        {
          text: "Aktual",
          value: "actual",
          sortable: false
        },
        {
          text: "Lunas",
          value: "lunas",
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
    ...mapActions("pinjaman", [
      "getPinjaman",
      "addPinjaman",
      "deletePinjaman",
      "editPinjaman",
      "setLunas"
    ]),
    showAddDialog() {
      this.editedItem = Object.assign({}, this.default);
      this.visibleDialog = true;
    },
    showEditDialog(item) {
      this.selectedItem = item;
      this.editedItem = Object.assign({}, this.selectedItem);
      this.visibleDialog = true;
    },
    fetchPinjamanList() {
      console.log("FETCH");
      console.log(this.page);

      this.isLoading = true;
      this.getPinjaman({
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
      console.log("SUCCESS");
      console.log(data);
      let { content, pageMetaData } = data;
      this.isLoading = false;
      this.items = content;
      console.log(this.items);
      this.page = pageMetaData.pageNumber;
      this.pageCount = Math.ceil(pageMetaData.totalRecords / this.itemsPerPage);
    },
    handleFail(error) {
      this.isLoading = false;
      this.$toast.open({
        message: error,
        type: "error",
        position: "top"
      });
    },
    save() {
      if (!this.selectedItem) {
        this.addPinjaman({
          data: this.editedItem,
          success: this.handleAddSucces,
          fail: this.handleAddFail
        });
      } else {
        this.editPinjaman({
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
      this.fetchPinjamanList();
      this.$toast.open({
        message: "Success Add data",
        type: "success",
        position: "top"
      });
      this.visibleDialog = false;
    },
    handleEditSucces() {
      this.fetchPinjamanList();
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
      this.deletePinjaman({
        data: {
          id: this.selectedItem.id
        },
        success: this.handleDeleteSucces,
        fail: this.handleDeleteFail
      });
    },
    handleDeleteSucces() {
      console.log("success");
      this.fetchPinjamanList();
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
    },
    editLunas(item) {
      this.selectedItem = item;
      this.visibleConfirmLunasDialog = true;
    },
    confirmLunas() {
      let todayDate = new Date();
      let month = todayDate.getMonth() + 1;
      let year = todayDate.getFullYear();
      console.log(this.selectedItem);
      console.log(this.selectedItem.anggota.no);

      this.setLunas({
        data: {
          no: this.selectedItem.anggota.no,
          month: month,
          year: year
        },
        success: this.handleLunasSucces,
        fail: this.handleLunasFail
      });
    },
    handleLunasSucces() {
      this.fetchPinjamanList();
      this.visibleConfirmLunasDialog = false;
      this.$toast.open({
        message: "Data Has Been updated",
        type: "success",
        position: "top"
      });
    },
    handleLunasFail(error) {
      this.visibleConfirmLunasDialog = false;
      this.$toast.open({
        message: error,
        type: "error",
        position: "top"
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
      return this.selectedItem ? "Edit Pinjaman" : "Tambahkan Pinjaman";
    },
    valid() {
      return (
        !!this.editedItem.anggota.no &&
        !!this.editedItem.anggota.name &&
        !!this.editedItem.anggota.rw &&
        !!this.editedItem.target &&
        !!this.editedItem.month &&
        !!this.editedItem.year &&
        !!this.editedItem.nominal
      );
    },
    query() {
      return this.$route.query;
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
    },
    visibleConfirmLunasDialog(value) {
      if (!value) {
        this.selectedItem = null;
      }
    },
    query() {
      this.page = parseInt(this.pageQuery);
      this.fetchPinjamanList();
    }
  },
  mounted() {
    this.searchKeyword = this.keyword;
    this.page = parseInt(this.pageQuery);
    this.fetchPinjamanList();
  }
};
</script>
