# Moodboard Node.js application

## *Main page*
The "Welcome" message is displaed on the main page of the website once the user visits it. The message welcomes the user and suggests that the user inputs a theme in the *Search pictures by theme* box and chooses a topic from a dropdown menu. After clicking the button __Submit__ the page will display a *"Quote of the day"* on the topic from the dropdown menu and 30 pictures on the theme that was input by the user.

When clicking on the picture, an alert message is generated in order for the user to choose whether he/she wants to save this picture in the *__Favourites_* section.


## *Favourites*
The user can see the photographs that were saved by clicking the button __Click to show saved pictures__, as to make the interface intuitive. A form in the left side of the page is provided for the user to upload some of the thoughts he/she might be having and willing to share and save. However, in order to upload a "thought" and see all the other thoughts that are anonymosly saved, the user has to know a secret password that is required to access this secret side of thought of the users of the website. If the password is unvalid a sensible message is displayed that notifies the user that the password is incorrect.

The password is *whatever*.

The user is asked to upload not only a thought, but a theme of the thought too, which, however, is not obligatory.


## API
The user makes asynchronous calls to two different APIs that return pictures from unsplash.com and quotes of the day from theysaidso.com.

#### Resource url for *unsplash.com*

``` GET https://api.unsplash.com/search/photos ```

#### Resource information
| Response formats  | JSON     |
| ------------- |:-------------:|
| Requires authentication? | Yes, but only by GET method|
| Rate limited   | Yes, 500 requests per day |

#### Parameters
| Name   | Required       | Description |
| ------------- |:-------------:| -----:|
| `query`    | yes | Search terms.|
| `page`    | optional; default: 1 | Page number to retrieve. |
| `per_page` | optional; default: 10   | Number of items per page. |
| `collections`  | optional  | Collection ID('s) to narrow search. If multiple, comma-separated.  |
| `orientation`   | optional  | Filter search results by photo orientation. Valid values are *landscape*, *portrait*, and *squarish*.   |

##### Example Request
``` GET https://api.unsplash.com/search/photos?page=1&query=office ```
##### Example Response
```
{
  "total": 133,
  "total_pages": 7,
  "results": [
    {
      "id": "eOLpJytrbsQ",
      "created_at": "2014-11-18T14:35:36-05:00",
      "width": 4000,
      "height": 3000,
      "color": "#A7A2A1",
      "likes": 286,
      "liked_by_user": false,
      "description": "A man drinking a coffee.",
      "user": {
        "id": "Ul0QVz12Goo",
        "username": "ugmonk",
        "name": "Jeff Sheldon",
        "first_name": "Jeff",
        "last_name": "Sheldon",
        "instagram_username": "instantgrammer",
        "twitter_username": "ugmonk",
        "portfolio_url": "http://ugmonk.com/",
        "profile_image": {
          "small": "https://images.unsplash.com/profile-1441298803695-accd94000cac?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=7cfe3b93750cb0c93e2f7caec08b5a41",
          "medium": "https://images.unsplash.com/profile-1441298803695-accd94000cac?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=5a9dc749c43ce5bd60870b129a40902f",
          "large": "https://images.unsplash.com/profile-1441298803695-accd94000cac?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=32085a077889586df88bfbe406692202"
        },
        "links": {
          "self": "https://api.unsplash.com/users/ugmonk",
          "html": "http://unsplash.com/@ugmonk",
          "photos": "https://api.unsplash.com/users/ugmonk/photos",
          "likes": "https://api.unsplash.com/users/ugmonk/likes"
        }
      },
      "current_user_collections": [],
      "urls": {
        "raw": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f",
        "full": "https://hd.unsplash.com/photo-1416339306562-f3d12fefd36f",
        "regular": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=92f3e02f63678acc8416d044e189f515",
        "small": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=263af33585f9d32af39d165b000845eb",
        "thumb": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=8aae34cf35df31a592f0bef16e6342ef"
      },
      "links": {
        "self": "https://api.unsplash.com/photos/eOLpJytrbsQ",
        "html": "http://unsplash.com/photos/eOLpJytrbsQ",
        "download": "http://unsplash.com/photos/eOLpJytrbsQ/download"
      }
    },
    // more photos ...
  ]
}
```

If a theme requested by the user is not common, there is a possibility that API would not find any pictures related to that theme. In this case a message would be displayed in order to notify the user that there are no results for his/her chosen theme, and suggest that he/she would try another theme.

#### Resource url for *theysaidso.com*

``` http://quotes.rest/qod.json/ ```

#### Resource information

| Response formats  | JSON     |
| ------------- |:-------------:|
| Requires authentication? | No |
| Rate limited   | Yes, 10 requests per hour. However, if the user exceeds this rate, a sensible message is displayed that states that too many requests have been made and show the time that has to pass in order for the user to access the information again. |
###### Parameters
| Name   | Required       | Description |
| ------------- |:-------------:| -----:|
| `category` | yes | one of: *inspire, management, sports, life, funny, love, art, students*|

###### Example Request

``` GET http://quotes.rest/qod.json?category=management ```

###### Example Response
```
{
    "success": {
        "total": 1
    },
    "contents": {
        "quotes": [
            {
                "quote": "In preparing for battle I have always found that plans are useless, but planning is indispensable.",
                "author": "Dwight Eisenhower",
                "length": "98",
                "tags": [
                    "battle-plan",
                    "leadership",
                    "management",
                    "time-management"
                ],
                "category": "management",
                "title": "Management Quote of the day",
                "date": "2019-05-01",
                "id": null
            }
        ],
        "copyright": "2017-19 theysaidso.com"
    }
}
```
