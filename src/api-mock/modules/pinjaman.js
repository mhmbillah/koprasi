import path from "@/config/api-path";

export default [
  {
    method: "POST",
    url: path.api.pinjaman,
    code: 200,
    status: "OK",
    response: {
      requestId: "32183217323823712973239231",
      errorMessage: null,
      errorCode: null,
      success: true
    }
  },
  {
    method: "PUT",
    url: path.api.pinjaman + "/1",
    code: 200,
    status: "OK",
    response: {
      requestId: "32183217323823712973239231",
      errorMessage: null,
      errorCode: null,
      success: true,
      content: {
        anggota: {
          no: "3",
          name: "kuuhaku",
          rw: 3
        },
        lunas: false,
        nominal: 30000,
        month: "Februari",
        year: 2020,
        actual: 0,
        target: 10
      }
    }
  },
  {
    method: "DELETE",
    url: path.api.pinjaman + "/1",
    code: 200,
    status: "OK",
    response: {
      requestId: "32183217323823712973239231",
      errorMessage: null,
      errorCode: null,
      success: true
    }
  },
  {
    method: "GET",
    url: path.api.pinjaman,
    code: 200,
    status: "OK",
    response: {
      requestId: "32183217323823712973239231",
      errorMessage: null,
      errorCode: null,
      success: true,
      content: [
        {
          id: "1",
          anggota: {
            no: "3",
            name: "kuuhaku",
            rw: 3
          },
          nominal: 30000,
          month: "Februari",
          year: 2020,
          lunas: false,
          actual: 0,
          target: 10
        }
      ],
      pagination: {
        page: 1,
        pageSize: 10,
        totalData: 20
      }
    }
  }
];
