
# API Documentation V1

## Base URL
All API requests are made to:
```
https://bbadp42egbsb26p1i861.containers.yandexcloud.net/v1
```

---

## Schools

### Get All Schools
- **Endpoint**: `/schools`
- **HTTP Method**: `GET`
- **Description**: Fetches all schools.
- **Response**:
    - `200 OK`: Returns a list of schools.
    - Each school object:
        - `id`: string
        - `name`: string
- **Response example**:
```json
[
	{
		"id": "02a3c858-b48f-4a6e-a72c-e55f6208feed",
		"name": "TODES Dubai",
	},
	{
		"id": "ab5d54c9-5a2e-45d7-b8a5-452485708e7b",
		"name": "TODES Riga",
	},
    ...
]
```

---

## Instructors

### Get Instructors (Paginated)
- **Endpoint**: `/instructors`
- **HTTP Method**: `GET`
- **Description**: Fetches a page of instructors. Pagination can be controlled with `page` and `limit` query parameters.
- **Query Parameters**:
    - `page`: Page number (default is 1).
    - `limit`: Number of instructors per page (default is 10).
- **Response**:
    - `200 OK`: Returns an instructor page object.
        - `instructors`: List of instructor objects.
            - Each instructor object:
                - `id`: string
                - `school`: School object (see above)
                - `first_name`: string
                - `last_name`: string
                - `age`: integer
                - `profile_image_url`: string
        - `total_count`: Total number of instructors.
        - `total_pages`: Total number of pages.
        - `page`: Current page number.
        - `limit`: Number of instructors per page.

- **Response example**:
```json
{
	"instructors": [
		{
			"id": "3c8492c2-414d-4a66-b764-d8a231d6d0f2",
			"school": {
				"id": "ab5d54c9-5a2e-45d7-b8a5-452485708e7b",
				"name": "TODES Riga",
			},
			"first_name": "Дмитрий",
			"last_name": "Матвеев",
			"age": 18,
			"profile_image_url": "https://robohash.org/jvbpdoblms",
		},
		{
			"id": "7562b415-df65-4f1c-8ec6-9aedcdc83d64",
			"school": {
				"id": "ab5d54c9-5a2e-45d7-b8a5-452485708e7b",
				"name": "TODES Riga",
			},
			"first_name": "Дмитрий",
			"last_name": "Матвеев",
			"age": 18,
			"profile_image_url": "https://robohash.org/uhgagsvnpd",
		},
        ...
    ],
    "total_count": 28,
	"total_pages": 6,
	"page": 1,
	"limit": 5
}
```

### Create Instructor
- **Endpoint**: `/instructors`
- **HTTP Method**: `POST`
- **Description**: Creates a new instructor.
- **Request Body**:
    - `school_id`: School's public ID (string).
    - `first_name`: Instructor's first name (string).
    - `last_name`: Instructor's last name (string).
    - `age`: Instructor's age (integer).
    - `profile_image_url`: Instructor's profile image URL (string, optional).
- **Response**:
    - `201 Created`: Instructor successfully created.
    - `400 Bad Request`: Invalid request body.

---
