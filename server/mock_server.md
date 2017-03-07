FORMAT: 1A

# Return all participants
List all participants from API

## Participants [/api/participants]

### Retrieve all participants [GET]

+ Response 200 (application/json)

  + Body

    [{
      "id": 1,
      "name": "Lawrence",
      "email": "lfields0@reddit.com",
      "phone": "261-(216)749-0121"
    }, {
      "id": 2,
      "name": "Peter",
      "email": "pcarroll1@redcross.org",
      "phone": "33-(595)414-5229"
    }, {
      "id": 3,
      "name": "Justin",
      "email": "jlane2@linkedin.com",
      "phone": "62-(621)223-2594"
    }, {
      "id": 4,
      "name": "Larry",
      "email": "lortiz3@a8.net",
      "phone": "63-(652)769-4912"
    }, {
      "id": 5,
      "name": "Frank",
      "email": "freyes4@parallels.com",
      "phone": "420-(750)448-9868"
    }, {
      "id": 6,
      "name": "Bobby",
      "email": "bsnyder5@xinhuanet.com",
      "phone": "506-(373)772-5339"
    }, {
      "id": 7,
      "name": "Eric",
      "email": "eellis6@i2i.jp",
      "phone": "7-(835)747-6146"
    }, {
      "id": 8,
      "name": "Harry",
      "email": "hcox7@mail.ru",
      "phone": "1-(719)784-7236"
    }, {
      "id": 9,
      "name": "Paul",
      "email": "psanchez8@timesonline.co.uk",
      "phone": "86-(299)503-0154"
    }, {
      "id": 10,
      "name": "Kevin",
      "email": "kwillis9@yale.edu",
      "phone": "381-(839)328-5673"
    }, {
      "id": 11,
      "name": "Philip",
      "email": "pbakera@360.cn",
      "phone": "66-(954)229-8190"
    }, {
      "id": 12,
      "name": "Howard",
      "email": "hsimmonsb@washingtonpost.com",
      "phone": "81-(480)798-3514"
    }, {
      "id": 13,
      "name": "Stephen",
      "email": "sharperc@furl.net",
      "phone": "357-(591)319-7103"
    }, {
      "id": 14,
      "name": "Harold",
      "email": "hfrazierd@npr.org",
      "phone": "234-(489)924-8289"
    }, {
      "id": 15,
      "name": "William",
      "email": "wcolemane@symantec.com",
      "phone": "86-(586)937-6727"
    }, {
      "id": 16,
      "name": "Raymond",
      "email": "rharrisonf@chicagotribune.com",
      "phone": "380-(882)486-8236"
    }, {
      "id": 17,
      "name": "Steve",
      "email": "sfieldsg@cdbaby.com",
      "phone": "57-(656)980-5627"
    }, {
      "id": 18,
      "name": "Terry",
      "email": "twhiteh@yellowbook.com",
      "phone": "7-(834)433-4439"
    }, {
      "id": 19,
      "name": "John",
      "email": "jsandersi@apache.org",
      "phone": "86-(911)621-6925"
    }, {
      "id": 20,
      "name": "Nicholas",
      "email": "ngilbertj@google.ca",
      "phone": "976-(480)982-2513"
    }]

### Create a Participant [POST]

+ name (string) - Participant name
+ email (string) - Participant email
+ phone (string) - Participant phone

+ Request (application/json)

    {
      "name": "Bao",
      "email": "Bao@google.com",
      "phone": "1"
    }

+ Response 201 (application/json)

    + Body

        {
          "id": 21,
          "name": "Bao",
          "email": "Bao@google.ca",
          "phone": "1"
        }

# Group Participant

## Participant [/api/participant/{participant_id}]

+ Parameters
    + participant_id: 1 (number) - ID of the Question in the form of an integer

### Edit a Participant [PUT]

+ id (number) - participant id
+ name (string) - Participant name
+ email (string) - Participant email
+ phone (string) - Participant phone

+ Request (application/json)

    {
      "id": 1,
      "name": "Bao1",
      "email": "Bao11@google.com",
      "phone": "11"
    }

+ Response 200 (application/json)

    + Body

        {
          "id": 1,
          "name": "Bao1",
          "email": "Bao11@google.ca",
          "phone": "11"
        }
