
type PocoRepository = {
    id: number
    dataColeta: string
    pocoNumero: number
    hidrometro: number
    horimetro: number
    created_at: Date
    updated_at: Date
}


type EfluenteRepository = {
    id: number
    dataColeta: string
    vazao1: number
    vazao2: number
    vazao3: number
    ph: number
    temperatura: number
    condutividade: number
    SD30: number
    created_at: Date
    updated_at: Date
}

type CloroResidualRepository = {
    id: number
    dataColeta: string
    saidaTratamento: number
    cozinha: number
    bebedouro1: number
    bebedouro2: number
    bebedouro3: number
    created_at: Date
    updated_at: Date
}
