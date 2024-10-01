import React, { useEffect, useState} from "react";
import { RapportCompany } from "../api/interfaces";
import { companyRapport } from "../api/actions";
import { PICT_URL } from "../api/axiosConfig";

const statis = [
    {
      rapport :  "partenaies",
      function : "companyRapport",
      fields : [ 'logo', 'companyName', 'totalProductCount', 'totalProductsPrice', 'totalParticipation',  'totalInProgressProds', 'totalEndedProds'],
      fieldsName : [ 'Logo', 'Partenaire', 'Produits', 'Prix total', 'Participation',  'Enchère en cours', 'Enchère terminés'],
      types : [ 'photo', 'text', 'text', 'text', 'text',  'text', 'text' ]
    }
  ]

type Props = {
    rapportType : number;
    dd : string;
    df : string;
};

const Rapport = ({rapportType, dd, df}: Props) => {

    const [ data, setData ] = useState<any>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const fetchData = async() => {
        if (statis[rapportType].function == 'companyRapport') {
            const d = await companyRapport(dd, df);
            if (d) {setData(d); setIsLoading(true)}
            console.log(d)
        }
    }
  
    useEffect(() => {
        fetchData();
    }, [rapportType, dd, df])
  
   return (
    <div className="rapport-content">
        <table className="rapport-table">
            <thead>
                <tr>
                    { statis[rapportType].fieldsName.map((f: string, i: number) =>
                        <th key={`th-${i}`}>{f}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {
                    data.map(( rap:any, i: number ) =>
                        <tr key={`tr-${i}`}>
                            { statis[rapportType].fields.map((fe: string, i: number) =>
                                statis[rapportType].types[i] == "photo" ? <td>{ <img src={ rap[fe].includes('http') ? rap[fe] : PICT_URL + rap[fe]   } className="rapport-avatar" /> }</td> : <td>{ rap[fe] }</td>
                            )}
                        </tr>
                    )
                }
                
            </tbody>
        </table>
        { (isLoading && data.length == 0) && <div className="pas-de-rapport">Pas de rapport pour cette periode!</div> }
    </div>

  );
};

export default Rapport;
