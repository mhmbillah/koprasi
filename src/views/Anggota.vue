<template>
  <div class="anggota-list__container">
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
                >Tambahkan Anggota</v-btn
              >
              <v-spacer></v-spacer>
              <!-- <v-text-field
                hide-details
                append-icon="mdi-magnify"
                single-line
                v-model="searchKeyword"
                placeholder="Cari nama anggota"
                clearable
                @keyup.enter="search"
                @click:clear="resetKeyword"
              ></v-text-field> -->
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
            <v-text-field
              label="Nomor Anggota"
              v-model="editedItem.no"
            ></v-text-field>
            <v-text-field label="Nama" v-model="editedItem.name"></v-text-field>
            <v-text-field
              label="Rw"
              v-model="editedItem.rw"
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
        title="Menghapus Anggota"
        :message="`Apakah anda yakin menghapus Anggota  ?`"
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
.anggota-list__container {
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
        name: "",
        rw: 0
      },
      editedItem: {
        no: "",
        month: "",
        rw: 0
      },
      visibleConfirmDialog: false,
      month: CONSTANT.MONTH,
      items: [],
      selectedItem: null,
      visibleMenu: false,
      headers: [
        {
          text: "No Anggota",
          align: "start",
          sortable: false,
          value: "no"
        },
        {
          text: "Nama",
          align: "start",
          sortable: false,
          value: "name"
        },
        {
          text: "RW",
          sortable: false,
          value: "rw"
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
    ...mapActions("anggota", [
      "getAnggota",
      "addAnggota",
      "deleteAnggota",
      "editAnggota"
    ]),
    ...mapActions("anggota", ["getAnggota"]),
    showAddDialog() {
      this.editedItem = Object.assign({}, this.default);
      this.visibleDialog = true;
    },
    showEditDialog(item) {
      this.selectedItem = item;
      this.editedItem = Object.assign({}, this.selectedItem);
      this.visibleDialog = true;
    },
    fetchAnggotaList() {
      console.log("FETCH");
      console.log(this.pageQuery);

      this.isLoading = true;
      this.getAnggota({
        data: {
          page: this.pageQuery,
          size: this.itemsPerPage
        },
        success: this.handleAnggotaSucces,
        fail: this.handleFail
      });
    },
    handleAnggotaSucces({ data }) {
      console.log(data);
      let { content, pageMetaData } = data;
      this.isLoading = false;
      this.items = content;
      this.page = pageMetaData.pageNumber;
      this.pageCount = Math.ceil(pageMetaData.totalRecords / this.itemsPerPage);
      console.log(this.pageCount);
    },
    save() {
      if (!this.selectedItem) {
        this.addAnggota({
          data: this.editedItem,
          success: this.handleAddSucces,
          fail: this.handleAddFail
        });
      } else {
        this.editAnggota({
          data: this.editedItem,
          success: this.handleEditSucces,
          fail: this.handleAddFail
        });
      }
    },
    handleAddSucces() {
      this.fetchAnggotaList();
      this.$toast.open({
        message: "Success Add data",
        type: "success",
        position: "top"
      });
      this.visibleDialog = false;
    },
    handleEditSucces() {
      this.fetchAnggotaList();
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
      this.deleteAnggota({
        data: {
          no: this.selectedItem.no
        },
        success: this.handleDeleteSucces,
        fail: this.handleDeleteFail
      });
    },
    handleDeleteSucces() {
      console.log("success");

      this.fetchAnggotaList();
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
    query() {
      return this.$route.query;
    },
    formTitle() {
      return this.selectedItem ? "Edit Anggota" : "Tambahkan Anggota";
    },
    valid() {
      return (
        !!this.editedItem.no && !!this.editedItem.name && !!this.editedItem.rw
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
    },
    query() {
      this.page = parseInt(this.pageQuery);
      this.fetchAnggotaList();
    }
  },
  mounted() {
    this.searchKeyword = this.keyword;
    this.page = parseInt(this.pageQuery);
    this.fetchAnggotaList();
  }
};
</script>
