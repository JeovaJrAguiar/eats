interface EServiceEnvironment {
  enviromentId: string,
  sucessfullUrl: string,
  redirectUrl: string,
  endpointUrl: string,
}

export interface Environment  {
  production: string;
  apiUrl: string;
  eService: EServiceEnvironment;
}
