let diveApiObject = {};



const diveSchema = {
  type: "object",
  properties: {
    DiverName: {
      type: "string",
      example: "John Doe",
    },
    DiveDepth:{
      type: "number",
      example: "3",
    },
    DiveDate:{
      type: "date",
      example: "2027-01-11T21:53:05.000",
    },
  },
};

const diveApiArr = [
  {
    path: "/dive/createNewDive/645413a073c588c7ccb997f7",
    respondWith: {
      post: {
        description: "create new Dive",
        parameters: [
          {
            name: "diverId",
            in: "params",
            type: "string",
           // required: true,
          },
        ],      
        requestBody: {
          content: {
            "application/json": {
              schema: diveSchema,
            },
          },
        },
        responses: {
          "200": {
            description: "created Successfully",
          },
          "400":{
            description: "error",
          }
        },
      },
    },
  },
];

diveApiArr.map((api) => (diveApiObject[api.path] = api.respondWith));

module.exports = diveApiObject;
