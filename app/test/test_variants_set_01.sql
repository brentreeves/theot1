--
--  percent agree / variants_set testing
-- 
delete from book_study where book = 'bnr';
insert into book_study (book, study_no, date_created, description, mss_used, tvus, notes, google_ss_url)
values
('bnr','1','2022/01/01','testing','{mss1,mss2,mss3}','{{1,tvu1},{2,tvu2},{3,tvu3},{4,tvu4}}','testing 3x4','url'),
('bnr','2','2022/01/02','testing','{mss1,mss2,mss3,mss4,mss5,mss6}','{{1,tvu1},{2,tvu2},{3,tvu3},{4,tvu4}}','testing 6x4','url');


delete from variants_set where book = 'bnr';
insert into variants_set (book, study_no, date_created, variants) values
('bnr', 1, '2022/01/02', '{{2,1,2},{2,1,2},{2,2,2},{2,2,1}}'),
('bnr', 2, '2022/01/03', '{{2,1,2,2,2,2},{2,1,2,2,2,1},{2,2,2,2,2,2},{2,2,1,2,1,1}}');
