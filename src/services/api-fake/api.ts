//Fake Api with mirageJS
import { createServer, Model } from 'miragejs';

createServer({

  models: {
    transaction: Model
  },


  seeds(server) {
    server.db.loadData({
      transactions: [
        { id: 1, title: "Freelancer de WebSite", type: "deposit", category: "Dev", amount: 3000, createdAt: new Date("2021-02-12 09:00:00") },
        { id: 2, title: "Freelancer de WebSite", type: "deposit", category: "Dev", amount: 6000, createdAt: new Date("2021-02-20 19:00:00") },
        { id: 3, title: "Jantar", type: "withdraw", category: "Food", amount: 100, createdAt: new Date("2021-02-30 21:00:00") },
      ],
    })
  },

  routes() {
    this.namespace = "api";


    this.get("/transactions", () => {
      return this.schema.all('transaction');
    })

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    })
  }
})