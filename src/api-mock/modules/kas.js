import path from "@/config/api-path";

export default [
  {
    method: "POST",
    url: path.api.kas,
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
    url: path.api.kas + "/1",
    code: 200,
    status: "OK",
    response: {
      requestId: "32183217323823712973239231",
      errorMessage: null,
      errorCode: null,
      success: true,
      content: {
        id: "5ee7083d2159f825677ba305",
        type: "",
        name: "rw 1",
        alurKas: "keluar",
        nominal: 50000,
        month: 2,
        year: 2020
      }
    }
  },
  {
    method: "DELETE",
    url: path.api.kas + "/1",
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
    method: "DELETE",
    url: path.api.kas,
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
    url: path.api.kas,
    code: 200,
    status: "OK",
    response: {
      requestId: "32183217323823712973239231",
      errorMessage: null,
      errorCode: null,
      success: true,
      content: [
        {
          id: "5ee7083d2159f825677ba305",
          name: "rw 1",
          alurKas: "MASUK",
          nominal: 50000,
          month: 2,
          year: 2020
        },
        {
          id: "5ee7083d2159f825677ba305",
          name: "rw 1",
          alurKas: "KELUAR",
          nominal: 50000,
          month: 2,
          year: 2020
        }
      ],
      pagination: {
        page: 1,
        pageSize: 10,
        totalData: 20
      }
    }
  },
  {
    method: "GET",
    url: path.api.kas + "/1",
    code: 200,
    status: "OK",
    response: {
      requestId: "32183217323823712973239231",
      errorMessage: null,
      errorCode: null,
      success: true,
      content: {
        id: "5ee7083d2159f825677ba305",
        name: "rw 1",
        alurKas: "masuk",
        nominal: 50000,
        month: 2,
        year: 2020
      }
    }
  },
  {
    method: "GET",
    url: path.api.kas + "/total",
    code: 200,
    status: "OK",
    response: {
      requestId: "32183217323823712973239231",
      errorMessage: null,
      errorCode: null,
      success: true,
      content: {
        kasMasuk: 183000,
        kasKeluar: 80000
      }
    }
  },
  {
    method: "POST",
    url: path.api.kas + "/generate",
    code: 200,
    status: "OK",
    response: {
      requestId: "32183217323823712973239231",
      errorMessage: null,
      errorCode: null,
      success: true
    }
  }
];
