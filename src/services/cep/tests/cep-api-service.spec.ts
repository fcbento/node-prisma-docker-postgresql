import { describe, expect, it } from "vitest";
import { getAddressByCep } from "../cep-api-service";
import { ErrorOnGettingAddressByCep } from "../errors/error-on-getting-address-by-cep";

describe('Cep API Service', () => {

  it('should return address by passing cep', async () => {
    const response = await getAddressByCep('08560200')
    expect(response).toEqual(expect.objectContaining({
      localidade: expect.any(String)
    }))
  })

  it('should not return address when passing an invalid cep', async () => {
    const response = await getAddressByCep('NON_EXISTING_CEP')
    expect(response).toBeInstanceOf(ErrorOnGettingAddressByCep)
  })

  it('should return error when no cep is passed as an argument', async () => {
    const response = await getAddressByCep('')
    expect(response).toBeInstanceOf(ErrorOnGettingAddressByCep)
  })

})