interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: Record<string, any>;
  params?: Record<string, string | number>;
}

export async function request<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method, headers, params, ...rest } = options;

  const normalizedParams = params
    ? new URLSearchParams(params as Record<string, string>).toString()
    : undefined;

  const queryString = normalizedParams ? `?${normalizedParams}` : "";

  const response = await fetch(`${process.env.api}/${url}${queryString}`, {
    ...rest,
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (response.status === 202) {
    response.json();
  }

  const data = response.json();

  return data;
}
