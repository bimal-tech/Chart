--Pass fail ratio doughnut chart
SELECT COUNT(*),
CASE
 WHEN division ='Fail' THEN 'Fail'
 WHEN division!='Fail' THEN 'Pass'
END AS status
 from student_report_card_outlines 
group by status
;


DROP FUNCTION IF EXISTS fnc_pass_fail_ratio_class_sectionwise;

CREATE FUNCTION fnc_pass_fail_ratio_class_sectionwise(
    in_session_id INTEGER,
    in_school_id INTEGER,
    in_class_id INTEGER,
    in_section_id INTEGER,
    in_exam_id INTEGER
) RETURNS TABLE (result_count BIGINT, status TEXT) AS
$body$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*) AS result_count,
        CASE
            WHEN division = 'Fail' THEN 'Fail'
            WHEN division != 'Fail' THEN 'Pass'
        END AS status
    FROM
        student_report_card_outlines
    WHERE
        session_id = in_session_id
        AND school_id = in_school_id
        AND class_id = in_class_id
        AND section_id = in_section_id
        AND exam_id=in_exam_id
    GROUP BY
        status;
END;
$body$ LANGUAGE plpgsql;








--Gradewise ratio pie chart

SELECT
       CASE
           WHEN COALESCE(grade_scored, 0) = 0
           THEN 'NG'
           WHEN COALESCE(grade_scored, 0) > 0
                AND COALESCE(grade_scored, 0) <= 1.6
           THEN 'D'
           WHEN COALESCE(grade_scored, 0) > 1.6
                AND COALESCE(grade_scored, 0) <= 2.0
           THEN 'C+'
           WHEN COALESCE(grade_scored, 0) > 2.0
                AND COALESCE(grade_scored, 0) <= 2.4
           THEN 'C'
           WHEN COALESCE(grade_scored, 0) > 2.4
                AND COALESCE(grade_scored, 0) <= 2.8
           THEN 'B'
           WHEN COALESCE(grade_scored, 0) > 2.8
                AND COALESCE(grade_scored, 0) <= 3.2
           THEN 'B+'
           WHEN COALESCE(grade_scored, 0) > 3.2
                AND COALESCE(grade_scored, 0) <= 3.6
           THEN 'A'
           WHEN COALESCE(grade_scored, 0) > 3.6
                AND COALESCE(grade_scored, 0) <= 4.0
           THEN 'A+'
       END AS grade,
       COUNT(*) AS count
FROM student_report_card_outlines
GROUP BY grade
ORDER BY grade;


DROP FUNCTION IF EXISTS fnc_grade_wise_ratio_class_sectionwise;

CREATE FUNCTION fnc_grade_wise_ratio_class_sectionwise(
    in_session_id INTEGER,
    in_school_id INTEGER,
    in_class_id INTEGER,
    in_section_id INTEGER,
in_exam_id INTEGER
) RETURNS TABLE (grade TEXT,result_count BIGINT) AS
$body$
BEGIN
    RETURN QUERY
    SELECT
       CASE
           WHEN COALESCE(grade_scored, 0) = 0
           THEN 'NG'
           WHEN COALESCE(grade_scored, 0) > 0
                AND COALESCE(grade_scored, 0) <= 1.6
           THEN 'D'
           WHEN COALESCE(grade_scored, 0) > 1.6
                AND COALESCE(grade_scored, 0) <= 2.0
           THEN 'C+'
           WHEN COALESCE(grade_scored, 0) > 2.0
                AND COALESCE(grade_scored, 0) <= 2.4
           THEN 'C'
           WHEN COALESCE(grade_scored, 0) > 2.4
                AND COALESCE(grade_scored, 0) <= 2.8
           THEN 'B'
           WHEN COALESCE(grade_scored, 0) > 2.8
                AND COALESCE(grade_scored, 0) <= 3.2
           THEN 'B+'
           WHEN COALESCE(grade_scored, 0) > 3.2
                AND COALESCE(grade_scored, 0) <= 3.6
           THEN 'A'
           WHEN COALESCE(grade_scored, 0) > 3.6
                AND COALESCE(grade_scored, 0) <= 4.0
           THEN 'A+'
       END AS grade,
       COUNT(*) AS result_count
FROM student_report_card_outlines
WHERE   session_id = in_session_id
        AND school_id = in_school_id
        AND class_id = in_class_id
        AND section_id = in_section_id
        AND exam_id=in_exam_id
GROUP BY grade
ORDER BY grade;      
END;
$body$ LANGUAGE plpgsql;






--Gender wise Pass fail ratio stacked chart
SELECT gender,
       COUNT(*),
       CASE
           WHEN division ='Fail' THEN 'Fail '
WHEN division!='Fail' THEN 'Pass'
END AS status
 from student_report_card_outlines join students on 
student_report_card_outlines.user_id=students.user_id
group by students.gender,status
;


DROP FUNCTION IF EXISTS fnc_pass_fail_ratio_genderwise;

CREATE FUNCTION fnc_pass_fail_ratio_genderwise(
    in_session_id INTEGER,
    in_school_id INTEGER,
    in_class_id INTEGER,
    in_section_id INTEGER,
in_exam_id INTEGER
) RETURNS TABLE (gender character varying ,result_count BIGINT,status TEXT) AS
$body$
BEGIN
    RETURN QUERY
   SELECT students.gender,
       COUNT(*) as result_count,
       CASE
           WHEN division ='Fail' THEN 'Fail '
WHEN division!='Fail' THEN 'Pass'
END AS status
 from student_report_card_outlines join students on 
student_report_card_outlines.user_id=students.user_id
WHERE 
    student_report_card_outlines.session_id = in_session_id
    AND student_report_card_outlines.school_id = in_school_id
    AND student_report_card_outlines.class_id = in_class_id
    AND student_report_card_outlines.section_id = in_section_id
group by students.gender,status;    
END;
$body$ LANGUAGE plpgsql;





--Genderwise grade ratio

SELECT gender,
       COUNT(*),
        CASE
           WHEN COALESCE(grade_scored, 0) = 0
           THEN 'NG'
           WHEN COALESCE(grade_scored, 0) > 0
                AND COALESCE(grade_scored, 0) <= 1.6
           THEN 'D'
           WHEN COALESCE(grade_scored, 0) > 1.6
                AND COALESCE(grade_scored, 0) <= 2.0
           THEN 'C+'
           WHEN COALESCE(grade_scored, 0) > 2.0
                AND COALESCE(grade_scored, 0) <= 2.4
           THEN 'C'
           WHEN COALESCE(grade_scored, 0) > 2.4
                AND COALESCE(grade_scored, 0) <= 2.8
           THEN 'B'
           WHEN COALESCE(grade_scored, 0) > 2.8
                AND COALESCE(grade_scored, 0) <= 3.2
           THEN 'B+'
           WHEN COALESCE(grade_scored, 0) > 3.2
                AND COALESCE(grade_scored, 0) <= 3.6
           THEN 'A'
           WHEN COALESCE(grade_scored, 0) > 3.6
                AND COALESCE(grade_scored, 0) <= 4.0
           THEN 'A+'
       END AS grade
 from student_report_card_outlines join students on 
student_report_card_outlines.user_id=students.user_id
group by students.gender,grade
order by gender,grade
;


DROP FUNCTION IF EXISTS fnc_genderwise_grade_ratio_class_sectionwise;

CREATE FUNCTION fnc_genderwise_grade_ratio_class_sectionwise(
    in_session_id INTEGER,
    in_school_id INTEGER,
    in_class_id INTEGER,
    in_section_id INTEGER,
in_exam_id INTEGER
) RETURNS TABLE (gender character varying,grade TEXT,result_count BIGINT) AS
$body$
BEGIN
    RETURN QUERY
    SELECT
       students.gender,
        CASE
           WHEN COALESCE(grade_scored, 0) = 0
           THEN 'NG'
           WHEN COALESCE(grade_scored, 0) > 0
                AND COALESCE(grade_scored, 0) <= 1.6
           THEN 'D'
           WHEN COALESCE(grade_scored, 0) > 1.6
                AND COALESCE(grade_scored, 0) <= 2.0
           THEN 'C+'
           WHEN COALESCE(grade_scored, 0) > 2.0
                AND COALESCE(grade_scored, 0) <= 2.4
           THEN 'C'
           WHEN COALESCE(grade_scored, 0) > 2.4
                AND COALESCE(grade_scored, 0) <= 2.8
           THEN 'B'
           WHEN COALESCE(grade_scored, 0) > 2.8
                AND COALESCE(grade_scored, 0) <= 3.2
           THEN 'B+'
           WHEN COALESCE(grade_scored, 0) > 3.2
                AND COALESCE(grade_scored, 0) <= 3.6
           THEN 'A'
           WHEN COALESCE(grade_scored, 0) > 3.6
                AND COALESCE(grade_scored, 0) <= 4.0
           THEN 'A+'
       END AS grade,
        COUNT(*) as result_count
 from student_report_card_outlines join students on 
student_report_card_outlines.user_id=students.user_id
WHERE       student_report_card_outlines.session_id = in_session_id
        AND student_report_card_outlines.school_id = in_school_id
        AND student_report_card_outlines.class_id = in_class_id
        AND student_report_card_outlines.section_id = in_section_id
group by students.gender,grade
order by gender,grade;    
END;
$body$ LANGUAGE plpgsql;









-- Marks distribution mixed chart(spline and bar )
SELECT
       CASE
           WHEN ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) >= 0
                AND ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) < 10
           THEN '0-10'
           WHEN ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) >= 10
                AND ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) < 20
           THEN '10-20'
           WHEN ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) >= 20
                AND ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) < 30
           THEN '20-30'
           WHEN ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) >= 30
                AND ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) < 40
           THEN '30-40'
           WHEN ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) >= 40
                AND ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) < 50
           THEN '40-50'
           WHEN ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) >= 50
                AND ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) < 60
           THEN '50-60'
           WHEN ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) >= 60
                AND ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) < 70
           THEN '60-70'
           WHEN ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) >= 70
                AND ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) < 80
           THEN '70-80'
           WHEN ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) >= 80
                AND ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) < 90
           THEN '80-90'
           WHEN ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) >= 90
                AND ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) <= 100
           THEN '90-100'
       END AS marks_interval,
       COUNT(*) AS count
FROM student_report_cards
GROUP BY marks_interval
ORDER BY marks_interval;


DROP FUNCTION IF EXISTS fnc_marks_distibution_class_sectionwise;

CREATE FUNCTION fnc_marks_distibution_class_sectionwise(
    in_session_id INTEGER,
    in_school_id INTEGER,
    in_class_id INTEGER,
    in_section_id INTEGER,
in_exam_id INTEGER
) RETURNS TABLE (marks_interval TEXT,result_count BIGINT) AS
$body$
BEGIN
    RETURN QUERY
   SELECT
       CASE
           WHEN ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) >= 0
                AND ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) < 10
           THEN '0-10'
           WHEN ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) >= 10
                AND ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) < 20
           THEN '10-20'
           WHEN ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) >= 20
                AND ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) < 30
           THEN '20-30'
           WHEN ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) >= 30
                AND ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) < 40
           THEN '30-40'
           WHEN ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) >= 40
                AND ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) < 50
           THEN '40-50'
           WHEN ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) >= 50
                AND ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) < 60
           THEN '50-60'
           WHEN ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) >= 60
                AND ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) < 70
           THEN '60-70'
           WHEN ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) >= 70
                AND ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) < 80
           THEN '70-80'
           WHEN ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) >= 80
                AND ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) < 90
           THEN '80-90'
           WHEN ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) >= 90
                AND ( COALESCE(th_marks, 0) + COALESCE(pr_marks, 0) ) <= 100
           THEN '90-100'
       END AS marks_interval,
       COUNT(*) AS result_count
FROM student_report_cards
WHERE  session_id = in_session_id
        AND school_id = in_school_id
        AND class_id = in_class_id
        AND section_id = in_section_id
        AND exam_id=in_exam_id
GROUP BY marks_interval
ORDER BY marks_interval;
END;
$body$ LANGUAGE plpgsql;