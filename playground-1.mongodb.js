db.getName()


db.places.aggregate([
   {}
])
db.places.aggregate([

    {
        $match: {
            category: "park",
            rating: { $gte: 4 }
        }
    }
])


db.places.aggregate([
   {
       $project: {
        name: 1,
        rating: 1,       
       }
   }
])

db.places.aggregate([
   {
    $project: {
        place:"$name",
        score:"$rating"
       }
   }
])
//Sortierung nach Bewertung absteigend
db.places.aggregate([
   {
    $sort: {
        rating: -1
    }
   }
])




//Gruppierung
//Anzahl der Plätze pro Kategorie

db.places.aggregate([
    {
      $group: {
          _id: "$category",
          count: { $sum: 1 }
      }
    }
   
])

//Durchschnittliche Bewertung pro Kategorie
db.places.aggregate([
    {
      $group: {
          _id: "$category",
          avgRating: { $avg: "$rating" }
      }
    },
    {
        $project: {
            avgRating:{ $round: ["$avgRating", 1] }
        }
    }
   
])

db.places.aggregate([
    {
        $group: {
            _id: "$category",
            places: { 
                $addToSet: "$name" 
            }
        }
    },
    {
        $project: {
            category: "$_id",
            places: 1,
            _id: 0
        }
    }
])

// neue Collection
db.places.aggregate([
    {
       $match: {
           category: "park"
       }
    },
    {
        $project: {
            category: 0
        }
    },
    {
        $out: "parks"
    }
])

db.parks.find()

db.orders.insertMany( [
   {
      customer_id: "elise_smith@myemail.com",
      orderdate: new Date("2020-05-30T08:35:52Z"),
      value: 231,
   },
   {
      customer_id: "elise_smith@myemail.com",
      orderdate: new Date("2020-01-13T09:32:07Z"),
      value: 99,
   },
   {
      customer_id: "oranieri@warmmail.com",
      orderdate: new Date("2020-01-01T08:25:37Z"),
      value: 63,
   },
   {
      customer_id: "tj@wheresmyemail.com",
      orderdate: new Date("2019-05-28T19:13:32Z"),
      value: 2,
   },
   {
      customer_id: "tj@wheresmyemail.com",
      orderdate: new Date("2020-11-23T22:56:53Z"),
      value: 187,
   },
   {
      customer_id: "tj@wheresmyemail.com",
      orderdate: new Date("2020-08-18T23:04:48Z"),
      value: 4,
   },
   {
      customer_id: "elise_smith@myemail.com",
      orderdate: new Date("2020-12-26T08:55:46Z"),
      value: 4,
   },
   {
      customer_id: "tj@wheresmyemail.com",
      orderdate: new Date("2021-02-29T07:49:32Z"),
      value: 1024,
   },
   {
      customer_id: "elise_smith@myemail.com",
      orderdate: new Date("2020-10-03T13:49:44Z"),
      value: 102,
   }
] )


db.places.aggregate([
    {
       $unwind: {
         path: "$location.coordinates"
       }
    }
])



db.places.aggregate([
    {
      $project: {
          _id: 0,
          name: 1,
          long:{
            $arrayElemAt: ["$location.coordinates", 0]
          }
      }
    }
])

