<template>
  <div class="kas-list__container">
    <v-card class="elevation-2 filter_container" width="100%">
      <v-card-text>
        <v-container class="d-flex align-center justify-space-around">
          <v-select
            label="Bulan"
            v-model="filter.month"
            :items="month"
            class="filter"
          ></v-select>
          <v-text-field
            label="Tahun"
            v-model="filter.year"
            type="number"
            class="filter"
          ></v-text-field>
          <v-btn
            color="primary"
            class="mb-2"
            @click="goFilter"
            :disabled="!validFilter"
            >Tampilkan Data</v-btn
          >
        </v-container>
      </v-card-text>
    </v-card>
    <v-card class="elevation-2 data_container" width="100%">
      <v-container>
        <Loading v-if="isLoading"></Loading>
        <v-data-table
          v-if="!isEmpty"
          :headers="headers"
          :items="items"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-btn color="primary" dark class="mb-2" @click="showAddDialog"
                >Tambahkan Transaksi</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                dark
                class="mb-2"
                @click="visibleConfirmResetDialog = true"
                >Reset Kas Bulan ini</v-btn
              >
            </v-toolbar>
          </template>
          <template v-slot:item.masuk="{ item }">
            <span v-if="item.alurKas == 'MASUK'">
              {{ item.nominal }}
            </span>
            <span v-else>
              -
            </span>
          </template>
          <template v-slot:item.keluar="{ item }">
            <span v-if="item.alurKas == 'KELUAR'">
              {{ item.nominal }}
            </span>
            <span v-else>
              -
            </span>
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
        <v-btn
          v-else
          color="primary"
          class="mb-2"
          @click="showGenerateDialog"
          block
          >Generate Laporan Kas</v-btn
        >
        <div class="text-center pt-2" v-if="!isEmpty">
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
              label="Nama Transaksi"
              v-model="editedItem.name"
            ></v-text-field>
            <v-text-field
              label="Nominal (Rp)"
              v-model="editedItem.nominal"
              type="number"
            ></v-text-field>
            <v-select
              label="Alur kas"
              v-model="editedItem.alurKas"
              :items="alur"
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
      <v-dialog v-model="visibleGenerateDialog" max-width="500">
        <v-card>
          <v-card-title
            ><span class="title">Generate Laporan</span></v-card-title
          >
          <v-card-text>
            <v-select
              label="Bulan"
              v-model="generateItem.month"
              :items="month"
            ></v-select>
            <v-text-field
              label="Tahun"
              v-model="generateItem.year"
              type="number"
            ></v-text-field>
            <v-card-actions>
              <v-btn
                color="primary"
                outlined
                class="mb-2"
                width="50%"
                @click="visibleGenerateDialog = false"
                >Batal</v-btn
              >
              <v-btn
                color="primary"
                class="mb-2"
                @click="generate"
                width="50%"
                :disabled="!validGenerate"
                >Simpan</v-btn
              >
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-dialog>
      <ConfirmDialog
        title="Menghapus Transaksi"
        :message="`Apakah anda yakin menghapus transaksi  ?`"
        :visible="visibleConfirmDialog"
        @cancel="
          visibleConfirmDialog = false;
          selectedItem = {};
        "
        @confirm="confirmDelete"
      ></ConfirmDialog>
      <ConfirmDialog
        title="Reset Transaksi"
        :message="
          `Apakah anda yakin menghapus seluruh transaksi ` +
            month[monthQuery - 1].text +
            ` ` +
            yearQuery +
            ` ?`
        "
        :visible="visibleConfirmResetDialog"
        @cancel="
          visibleConfirmResetDialog = false;
          selectedItem = {};
        "
        @confirm="confirmResetKas"
      ></ConfirmDialog>
    </v-card>
    <v-card class="elevation-2 filter_container" width="100%" v-if="!isEmpty">
      <v-card-text>
        <v-container class="d-flex align-center justify-space-around">
          <v-text-field
            :label="
              'Total Nominal Masuk ' +
                month[monthQuery - 1].text +
                ' ' +
                yearQuery
            "
            v-model="totalNominal.masuk"
            type="number"
            class="filter"
            readonly
          ></v-text-field>
          <v-text-field
            :label="
              'Total Nominal Keluar ' +
                month[monthQuery - 1].text +
                ' ' +
                yearQuery
            "
            v-model="totalNominal.keluar"
            type="number"
            class="filter"
            readonly
          ></v-text-field>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
.kas-list__container {
  height: 100%;
  width: 100%;
  padding: 20px;

  .filter {
    // width: calc(100%-20px);
    margin-right: 20px;
  }

  .filter_container {
    margin-bottom: 20px;
  }
  .data_container {
    margin-bottom: 20px;
  }
}
</style>

<script>
import { mapActions } from "vuex";
const Loading = () => import("@/components/common/Loading.vue");
const ConfirmDialog = () => import("@/components/common/ConfirmDialog.vue");

import CONSTANT from "@/constant";

const ALUR = [
  {
    text: "Masuk",
    value: "MASUK"
  },
  {
    text: "Keluar",
    value: "KELUAR"
  }
];

export default {
  components: { Loading, ConfirmDialog },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      visibleDialog: false,
      isLoading: false,
      default: {
        name: "",
        nominal: 0,
        alurKas: "",
        month: 0,
        year: 0
      },
      editedItem: {
        name: "",
        nominal: 0,
        alurKas: "",
        month: 0,
        year: 0
      },
      visibleConfirmDialog: false,
      visibleConfirmResetDialog: false,
      visibleGenerateDialog: false,
      month: CONSTANT.MONTH,
      items: [],
      filter: {
        month: 0,
        year: 0
      },
      generateItem: {
        month: 0,
        year: 0
      },
      selectedItem: null,
      visibleMenu: false,
      headers: [
        {
          text: "Transaksi",
          align: "start",
          sortable: false,
          value: "name"
        },
        {
          text: "Nominal Keluar",
          sortable: false,
          value: "keluar"
        },
        {
          text: "Nominal Masuk",
          value: "masuk",
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
      anggota: [],
      alur: ALUR,
      totalNominal: {
        masuk: 0,
        keluar: 0
      }
    };
  },
  methods: {
    ...mapActions("kas", [
      "getKas",
      "addKas",
      "deleteKas",
      "editKas",
      "generateKas",
      "getTotalKas",
      "deleteByMonthAndYearKas"
    ]),
    showAddDialog() {
      this.editedItem = Object.assign({}, this.default);
      this.editedItem.type = "BEBAN";
      this.visibleDialog = true;
    },
    showEditDialog(item) {
      this.selectedItem = item;
      this.editedItem = Object.assign({}, this.selectedItem);
      this.visibleDialog = true;
    },
    showGenerateDialog() {
      this.generateItem = Object.assign({}, this.filter);
      this.visibleGenerateDialog = true;
    },
    fetchKasList() {
      this.isLoading = true;
      this.getKas({
        data: {
          page: this.page,
          month: this.monthQuery,
          year: this.yearQuery,
          size: this.itemsPerPage
        },
        success: this.handleSucces,
        fail: this.handleFail
      });
    },
    handleSucces({ data }) {
      let { content, pageMetaData } = data;
      this.isLoading = false;
      this.items = content;
      this.page = pageMetaData.pageNumber;
      this.pageCount = Math.ceil(pageMetaData.totalRecords / this.itemsPerPage);
      this.fetchTotalNominal();
    },
    handleFail(error) {
      this.isLoading = false;
      this.$toast.open({
        message: error,
        type: "error",
        position: "top"
      });
    },
    fetchTotalNominal() {
      this.getTotalKas({
        data: {
          month: this.monthQuery,
          year: this.yearQuery
        },
        success: this.handleGetTotalSuccess,
        fail: this.handleFail
      });
    },
    handleGetTotalSuccess({ data }) {
      let { content } = data;
      this.$toast.open({
        message: "Fetch total nominal success",
        type: "success",
        position: "top"
      });
      this.totalNominal.masuk = content.kasMasuk;
      this.totalNominal.keluar = content.kasKeluar;
    },
    handleGetTotalFail(error) {
      this.$toast.open({
        message: error,
        type: "error",
        position: "top"
      });
    },
    save() {
      if (!this.selectedItem) {
        this.addKas({
          data: this.editedItem,
          success: this.handleAddSucces,
          fail: this.handleAddFail
        });
      } else {
        this.editKas({
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
      this.fetchKasList();
      this.$toast.open({
        message: "Success Add data",
        type: "success",
        position: "top"
      });
      this.visibleDialog = false;
    },
    handleEditSucces() {
      this.fetchKasList();
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
    goFilter() {
      this.$router.push({
        query: Object.assign({}, this.$route.query, {
          month: this.filter.month,
          year: this.filter.year
        })
      });
    },
    generate() {
      this.generateKas({
        data: this.generateItem,
        success: this.handleGenerateSuccess,
        fail: this.handleGenerateFail
      });
    },
    handleGenerateSuccess() {
      this.$toast.open({
        message: "Generate Success",
        type: "success",
        position: "top"
      });
      this.fetchKasList();
      this.visibleGenerateDialog = false;
    },
    handleGenerateFail(error) {
      this.$toast.open({
        message: error,
        type: "error",
        position: "top"
      });
      this.visibleGenerateDialog = false;
    },
    goDetails() {
      this.$router.push("/admin/floors");
    },
    deleteItem(item) {
      this.selectedItem = item;
      this.visibleConfirmDialog = true;
    },
    confirmDelete() {
      this.deleteKas({
        data: {
          id: this.selectedItem.id
        },
        success: this.handleDeleteSucces,
        fail: this.handleDeleteFail
      });
    },
    handleDeleteSucces() {
      this.fetchKasList();
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
    confirmResetKas() {
      this.deleteByMonthAndYearKas({
        data: {
          month: this.monthQuery,
          year: this.yearQuery
        },
        success: this.handleResetSuccess,
        fail: this.handleResetFail
      });
    },
    handleResetSuccess() {
      this.fetchKasList();
      this.visibleConfirmResetDialog = false;
      this.$toast.open({
        message: "All data Has Been deleted",
        type: "success",
        position: "top"
      });
    },
    handleResetFail(error) {
      this.visibleConfirmResetDialog = false;
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
          month: "",
          year: 1
        }
      });
    }
  },
  computed: {
    monthQuery() {
      return this.$route.query.month || 1;
    },
    yearQuery() {
      return this.$route.query.year || 2020;
    },
    pageQuery() {
      return this.$route.query.page || 1;
    },
    formTitle() {
      return this.selectedItem ? "Edit Kas" : "Tambahkan Kas";
    },
    query() {
      return this.$route.query;
    },
    valid() {
      return (
        !!this.editedItem.name &&
        !!this.editedItem.month &&
        !!this.editedItem.year &&
        !!this.editedItem.alurKas &&
        !!this.editedItem.nominal
      );
    },
    validFilter() {
      return !!this.filter.month && !!this.filter.year;
    },
    validGenerate() {
      return !!this.generateItem.month && !!this.generateItem.year;
    },
    isEmpty() {
      return this.items.length == 0;
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
    query() {
      this.fetchKasList();
      this.page = parseInt(this.pageQuery);
    }
  },
  mounted() {
    this.filter.month = this.monthQuery;
    this.filter.year = this.yearQuery;
    this.page = parseInt(this.pageQuery);
    this.page = parseInt(this.pageQuery);
    this.fetchKasList();
  }
};
</script>
