let diverApiObject = {};



const diverSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      example: "John Doe",
    },
    diverNumber:{
      type: "number",
      example: 3,
    },
  },
};

const diverApiArr = [
  {
    path: "/diver/getDiver/{diverNumber}",
    respondWith: {
      get: {
        parameters: [
          {
            name: "diverNumber",
            in: "params",
            type: "number",
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "successfull operation",
            content: {
              "application/json": {
                schema: { required: ["balance"],
                properties: {
                  _id: {
                    type: "string",
                    examlple: "644fa7a4723c0988699b28bf",
                  },
                  name: {
                    type: "string",
                    examlple: "hassan",
                  },
                  DiveLogs: {
                    type: "array",
                    items: {
                      type: "object",
                    },
                  },
                
                  numberOfdives: {
                    type: "number",
                    examlple: "3",
                  },

                },
              },
              },
            },             
          },
          "404": {
            description: "diver not found",
          },
        },
      },
    },
  },
 
  {
    path: "/diver/addDiver",
    respondWith: {
      post: {
        description: "create new Diver",

        requestBody: {
          content: {
            "application/json": {
              schema: diverSchema,
            },
          },
        },
        responses: {
          "200": {
            description: "diver added Successfully",
          },
          "400": {
            description: "diver number must be unique",
          },
        },
      },
    },
  },
];

diverApiArr.map((api) => (diverApiObject[api.path] = api.respondWith));

module.exports = diverApiObject;
