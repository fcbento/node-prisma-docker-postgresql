import got from 'got'
import { ErrorOnGettingAddressByCep } from './errors/error-on-getting-address-by-cep'

export interface AddressResponse {
  cep: string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  estado: string
  regiao: string
}

export const getAddressByCep = async (cep: string): Promise<AddressResponse | ErrorOnGettingAddressByCep> => {
  try {
    
    if(!cep) {
      return new ErrorOnGettingAddressByCep()
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`
    const response = await got(url)
    return JSON.parse(response.body)
  } catch (err) {
    return new ErrorOnGettingAddressByCep()
  }

}

