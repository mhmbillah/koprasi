import path from "@/config/api-path";

export default [
  {
    method: "POST",
    url: path.api.category,
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
    url: path.api.category + "/123",
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
    url: path.api.category + "/123",
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
    url: path.api.category + "/123",
    code: 200,
    status: "OK",
    response: {
      requestId: "32183217323823712973239231",
      errorMessage: null,
      errorCode: null,
      success: true,
      content: {
        name: "Restoran Cepat Saji",
        icon: "base:64file",
        totalPlace: "3",
        createdAt: "1535646676"
      }
    }
  },
  {
    method: "GET",
    url: path.api.category,
    code: 200,
    status: "OK",
    response: {
      requestId: "32183217323823712973239231",
      errorMessage: null,
      errorCode: null,
      success: true,
      content: [
        {
          name: "Restoran Cepat Saji",
          icon: "base:64file",
          totalPlace: "3",
          createdAt: "1535646676"
        },
        {
          name: "Restoran Cepat Saji",
          icon: "base:64file",
          totalPlace: "3",
          createdAt: "1535646676"
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
