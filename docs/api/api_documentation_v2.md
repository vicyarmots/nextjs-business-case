
# API Documentation V2

## Base URL
All API requests are made to:
```
https://bbadp42egbsb26p1i861.containers.yandexcloud.net/v2
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
- **Request Body Example**:
```json
{
	"school_id": "09dc7015-2b2a-461e-861f-13dc2f91879a",
	"first_name": "Дмитрий",
	"last_name": "Матвеев",
	"age": 18
}
```
- **Response**:
    - `202 Job Accepted`: Returns json with message and job id.
      - `job_id`: string
      - `message`: string

- **Response example**:
```json
{
	"job_id": "c77f0ad3-cfca-4447-a488-7d6fa0889896",
	"message": "Job accepted"
}
```
    - `400 Bad Request`: Invalid request body.

---

## Jobs

### Get Job
-- **Endpoint**: `/jobs/{job_id}`
- **HTTP Method**: `GET`
- **Description**: Fetches a job info object.
- **Path Parameters**:
	- `job_id`: Job's ID (string).
- **Response**:
	- `200 OK`: Returns a job info object.
		- `id`: Job's ID (string).
		- `job_type`: Job type object.
			- `id`: Job type's ID (string).
			- `name`: Job type's name (string).
		- `status`: Job's status (string). Possible values: `PENDING`, `COMPLETED`
		- `created_at`: Job's creation date (string).
		- `updated_at`: Job's last update date (string).
- **Response example**: Pending
```json
{
	"id": "c77f0ad3-cfca-4447-a488-7d6fa0889896",
	"job_type": {
		"id": "create_instructor",
		"name": "Create Instructor"
	},
	"status": "PENDING",
	"created_at": "2021-05-01T12:00:00Z",
	"updated_at": "2021-05-01T12:00:00Z"
}
```
- **Response example**: Completed
```json
{
	"id": "c77f0ad3-cfca-4447-a488-7d6fa0889896",
	"job_type": {
		"id": "create_instructor",
		"name": "Create Instructor"
	},
	"status": "COMPLETED",
	"created_at": "2021-05-01T12:00:00Z",
	"updated_at": "2021-05-01T12:00:00Z"
}
```