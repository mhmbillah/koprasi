import path from "@/config/api-path";

export default [
  {
    method: "POST",
    url: path.api.anggota,
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
    url: path.api.anggota,
    code: 200,
    status: "OK",
    response: {
      requestId: "32183217323823712973239231",
      errorMessage: null,
      errorCode: null,
      success: true,
      content: {
        no: "1",
        name: "name",
        rw: "1"
      }
    }
  },
  {
    method: "DELETE",
    url: path.api.anggota + "/1",
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
    url: path.api.anggota + "/name",
    code: 200,
    status: "OK",
    response: {
      requestId: "32183217323823712973239231",
      errorMessage: null,
      errorCode: null,
      success: true,
      content: {
        no: "1",
        name: "name",
        rw: "1"
      }
    }
  },
  {
    method: "GET",
    url: path.api.anggota,
    code: 200,
    status: "OK",
    response: {
      requestId: "32183217323823712973239231",
      errorMessage: null,
      errorCode: null,
      success: true,
      content: [
        {
          no: "1",
          name: "name",
          rw: "1"
        },
        {
          no: "2",
          name: "ega",
          rw: "1"
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
