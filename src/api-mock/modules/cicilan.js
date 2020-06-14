import path from "@/config/api-path";

export default [
  {
    method: "POST",
    url: path.api.cicilan,
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
    url: path.api.cicilan + "/1",
    code: 200,
    status: "OK",
    response: {
      requestId: "32183217323823712973239231",
      errorMessage: null,
      errorCode: null,
      success: true,
      content: {
        id: "1",
        anggota: {
          no: "3",
          name: "kuuhaku",
          rw: 3
        },
        pokok: 3000,
        jasa: 1500,
        month: "Februari",
        year: 2020
      }
    }
  },
  {
    method: "DELETE",
    url: path.api.cicilan + "/1",
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
    url: path.api.cicilan,
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
          pokok: 30000,
          jasa: 5000,
          month: "Februari",
          year: 2020
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
