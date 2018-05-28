# dexie-populate
A module to populate referenced fields from other table. 

**Installation:**

    <script src="/js/dexie.js"></script>
    <script src="/js/dexie-populate.js"></script>
  
**Usage:**
    
    db.groupMembers.toCollection().limit(2).toArray()
      .then(result => console.log(result))
     // Output: 
     //    [
     //       {
     //          "member": 251387385,
     //          "group": "AppliedSingularity",
     //          "status": "active",
     //          "visited": 1526751683000,
     //          "created": 1522525135000,
     //          "updated": 1522525888000,
     //          "role": "organizer",
     //          "key": 1
     //       },
     //       {
     //          "member": 224969492,
     //          "group": "AppliedSingularity",
     //          "status": "active",
     //          "visited": 1526748041000,
     //          "created": 1491210301000,
     //          "updated": 1505109721000,
     //          "role": "assistant_organizer",
     //          "key": 2
     //       }
     //    ]
     //    
    db.groupMembers.toCollection().limit(2)
      .populate({field: 'member', table: 'people'})
      .then(result => console.log(result))
    
     // Output:
     //   [
     //       {
     //          "member": {
     //             "id": 251387385,
     //             "name": "Nihal Kashinath",
     //             "status": "active",
     //             "joined": 1522524945000,
     //             "city": "Bangalore",
     //             "country": "in",
     //             "localized_country_name": "India",
     //             "lat": 12.97,
     //             "lon": 77.56
     //          },
     //          "group": "AppliedSingularity",
     //          "status": "active",
     //          "visited": 1526751683000,
     //          "created": 1522525135000,
     //          "updated": 1522525888000,
     //          "role": "organizer",
     //          "key": 1
     //       },
     //       {
     //          "member": {
     //             "id": 224969492,
     //             "name": "Ambika TM",
     //             "status": "active",
     //             "joined": 1491210292000,
     //             "city": "Bangalore",
     //             "country": "in",
     //             "localized_country_name": "India",
     //             "lat": 12.97,
     //             "lon": 77.56
     //          },
     //          "group": "AppliedSingularity",
     //          "status": "active",
     //          "visited": 1526748041000,
     //          "created": 1491210301000,
     //          "updated": 1505109721000,
     //          "role": "assistant_organizer",
     //          "key": 2
     //       }
     //   ]
    
**Populate multiple fields**

    db.groupMembers.toCollection().limit(2)
      .populate([
        {field: 'member', table: 'people'},
        {field: 'group', table: 'groups'}
       ])
      .then(result => console.log(result))
      
      
# Documentation

**``db.<Table>.populate(options)``**

**``options``** - Array of field details or field detail object

**``options.field``** - Field to be populated from referenced table

**``options.table``** - Table to populate data from

**``options.key``** - Primary key Field name to match data (default = id)
