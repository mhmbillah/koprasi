import path from "@/config/api-path";

export default [
  {
    method: "POST",
    url: path.api.simpanan,
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
    url: path.api.simpanan + "/1",
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
          no: "2",
          name: "ega",
          rw: 3
        },
        type: "POKOK",
        nominal: 30000,
        month: "Januari",
        year: 2020
      }
    }
  },
  {
    method: "DELETE",
    url: path.api.simpanan + "/1",
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
    url: path.api.simpanan,
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
            no: "2",
            name: "ega",
            rw: 3
          },
          type: "POKOK",
          nominal: 0,
          month: 1,
          year: 2020
        },
        {
          id: "2",
          anggota: {
            no: "2",
            name: "ega",
            rw: 3
          },
          type: "POKOK",
          nominal: 0,
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
    url: path.api.simpanan + "/1",
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
          no: "2",
          name: "ega",
          rw: 3
        },
        type: "POKOK",
        nominal: 30000,
        month: "Januari",
        year: 2020
      }
    }
  }
];
