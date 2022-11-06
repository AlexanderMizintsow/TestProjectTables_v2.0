create or replace function getting_contents_receipt(id integer)
    returns TABLE
            (
                "Drug"        character varying,
                "Form"        character varying,
                "Fabr"        character varying,
                "UQuantity"   numeric,
                "SumRoznWNDS" numeric,
                "NDS"         smallint,
                "SrokG"       date
            )
    language plpgsql
as
$$
begin
    return query (SELECT Drug."Drug",
                         Form."Form",
                         Fabr."Fabr",
                         floor(NaklDataR."UQuantity"),
                         NaklDataR."SumRoznWNDS",
                         NaklData."NDS",
                         NaklData."SrokG"
                  FROM "Test_Drug" AS Drug
                           JOIN "Test_Registry" Registry ON Registry."DrugID" = Drug."DrugID"
                           JOIN "Test_Form" AS Form ON Registry."FormID" = Form."FormID"
                           JOIN "Test_Fabr" AS Fabr ON Fabr."FabrID" = Registry."FabrID"
                           JOIN "Test_NaklData" NaklData ON NaklData."RegID" = Registry."RegID"
                           JOIN "Test_NaklDataR" NaklDataR ON NaklDataR."NaklDataID" = NaklData."NaklDataID"
                           JOIN "Test_NaklTitleR" NaklTitleR ON NaklTitleR."NaklTitleRID" = NaklDataR."NaklTitleRID"
                  WHERE NaklDataR."Disable" = '0'
                    AND NaklTitleR."Disable" = '0'
                    AND NaklDataR."NaklTitleRID" = id);
end;
$$;


CREATE FUNCTION test ()
RETURN TABLE (
    "lal" int
)
LANGUAGE plpgsql
as 
$$
BEGIN
RETURN QUERY (


)
end;
$$;






create function sales_list()
    returns TABLE
            (
                "Branch"      character varying,
                "DocType"     character varying,
                "posCount"    character,
                "CreateDate"  timestamp,
                "sumQuantity" numeric,
                "SumRoznWNDS" numeric
            )
    language plpgsql
as
$$
begin
    return query (SELECT branch."Branch",
                         type."DocType",
                         naklTitleR."IsPost"   AS posCount,
                         naklTitleR."CreateDate",
                         naklDataR."UQuantity" AS sumQuantity,
                         naklDataR."SumRoznWNDS"
                  FROM "Test_NaklDataR" naklDataR
                           JOIN "Test_NaklTitleR" naklTitleR ON naklTitleR."NaklTitleRID" = naklDataR."NaklTitleRID"
                           JOIN "Branch" branch ON naklTitleR."BranchID" = branch."BranchID"
                           JOIN "DocType" type ON type."DocTypeID" = naklTitleR."DocTypeID"
                           JOIN "Test_NaklData" naklData ON naklData."BranchID" = branch."BranchID"
                  WHERE naklTitleR."IsPost" = '1'
                    AND naklTitleR."Disable" = '0'
                  ORDER BY "CreateDate" DESC);
end;
$$;



SELECT row_to_json(t)
FROM (SELECT *
      FROM getting_contents_receipt()) t;


SELECT row_to_json(t)
FROM (SELECT *
      FROM getting_contents_receipt()) t
LIMIT 50;

DROP function getting_contents_receipt();

SELECT getting_contents_receipt()
FROM sales_list();
