export interface LineaVenta {
    material?: string;
    descripcion?: string;
    centro?: string;
    almacen?: string;
    stock?: number;
    cantidad?: number;
    precioUnitario?: number;
    descuento?: number;
    porcDscto?: number;
}

export interface HEADER {
    DOC_TYPE?: string;
    SALES_ORG?: string;
    DISTR_CHAN?: string;
    DIVISION?: string;
    SALES_GRP?: string;
    SALES_OFF?: string;
    PURCH_DATE?: string;
    PMNTTRMS?: string;
    QT_VALID_F?: string;
    QT_VALID_T?: string;
    DOC_DATE?: string;
    CURRENCY?: string;
    REF_DOC?: string;
    REFDOC_CAT?: string;
    PURCH_NO_C?: string;
    VERSION?: string;
    CLIENT_ID?: string;
}

export interface ITEM {
    ITM_NUMBER?: string;
    MATERIAL?: string;
    PLANT?: string;
    STORE_LOC?: string;
    TARGET_QTY?: string;
    SHORT_TEXT?: string;
    PROFIT_CTR?: string;
    REASON_REJ?: string;
    REF_DOC?: string;
    REF_DOC_IT?: string;
    REF_DOC_CA?: string;
}

export interface SCHEDULE {
    ITM_NUMBER?: string;
    REQ_DATE?: string;
    REQ_QTY?: string;
}

export interface CONDITION {
    ITM_NUMBER?: string;
    COND_TYPE?: string;
    COND_VALUE?: string;
    CURRENCY?: string;
}

export interface PARTNER {
    ADDR_NO?: string;
    NAME?: string;
    NAME2?: string;
    NAME3?: string;
    NAME4?: string;
    STREET?: string;
    STR_SUPPL1?: string;
    STR_SUPPL2?: string;
    LOCATION?: string;
    STR_SUPPL3?: string;
    COUNTRY?: string;
    CITY?: string;
    REGION?: string;
    SORT1?: string;
    TEL1_NUMBR?: string;
    E_MAIL?: string;
}

export interface CLIENT_RESULT {
    KUNNR?: string;
    XCPDK?: string;
    CUSTOMER_ID?: string;
    STCD1?: string;
    NAME?: string;
    BRSCH?: string;
    BRTXT?: string;
    TELF1?: string;
    TELF2?: string;
    EMAIL?: string;
    DIRECCION?: string;
    ZTERM?: string;
    REGULAR?: string;
    TITLE?: string;
    TIPO_DOC?: string;
    GEOLOCALIZACION?: string;
    OBSERVACIONES?: string;
    CONTACTO?: string;
}

export interface CLIENT_PARAMS {
    codigo?: string;
    nit?: string;
    nombre?: string;
}
