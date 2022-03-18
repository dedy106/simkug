--UNIT
select a.kode_lokasi, substring(convert(varchar,a.tgl_mulai,112),1,4) as tahun ,
a.kode_proyek,a.no_pks, a.nama,a.kode_cust,c.nama as nama_cust, convert(varchar(20),a.tgl_mulai,103) as tgl_mulai,convert(varchar(20),a.tgl_selesai,103) as tgl_selesai,convert(varchar(20),a.tgl_admin,103) as tgl_admin,
isnull(t.jum_ubah,0) as tgl_perpanjangan,
a.nilai,isnull(d.pdpt,0) as pdpt,
isnull (e.piuppn,0) as piuppn, 
a.nilai+isnull(e.piuppn,0) as nilai_tot,isnull(pb.pbyr,0) as pbyr_real,
isnull(pbn.ppn,0) as pbyr_ppn, 
isnull(pb.pbyr,0)+isnull(pbn.ppn,0) as pbyr_aud,
(a.nilai+isnull(e.piuppn,0))-(isnull(pb.pbyr,0)+isnull(pbn.ppn,0)) as piu_real, 
(a.nilai+isnull(e.piuppn,0))-(isnull(pb.pbyr,0)) as piu_aud,a.nilai_or, 
(a.nilai_or/NULLIF(a.nilai,0)) as p_or, 
isnull(b.beban,0) as beban,a.nilai_or as beban_realx,
isnull(bb.beban_real,0) as beban_real, 
isnull((bb.beban_real/NULLIF(d.pdpt,0)),0) as real,
a.nilai-isnull(bb.beban_real,0) as laba,a.nilai-isnull(d.pdpt,0) as piu,
isnull((bb.beban_real/NULLIF(a.nilai,0)),0) as real2 
from prb_proyek a 
inner join pp p on a.kode_pp=p.kode_pp and a.kode_lokasi=p.kode_lokasi 
left join (select a.no_dokumen,a.kode_lokasi,sum(a.nilai) as pdpt 
			from trans_j a 
			where a.kode_lokasi='11' and a.jenis='PDPT' and a.modul='GENPYT' 
			group by a.no_dokumen,a.kode_lokasi) d on a.kode_proyek=d.no_dokumen and a.kode_lokasi=d.kode_lokasi 
left join (select a.no_ref1,a.kode_lokasi,sum(a.nilai1) as piuppn 
			from trans_m a 
			where a.kode_lokasi='11' and a.form='PRPPN' and a.modul='AR' 
			group by a.no_ref1,a.kode_lokasi) e on a.kode_proyek=e.no_ref1 and a.kode_lokasi=e.kode_lokasi 
left join (select a.kode_proyek,a.kode_lokasi,a.periode_sch,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as beban 
			from prb_prbeban_d a 
			left join (select a.no_aju,a.no_kas,a.kode_lokasi 
						from it_aju_m a 
						inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi 
						where b.kode_lokasi='11' ) b on a.no_bukti = b.no_aju and a.kode_lokasi=b.kode_lokasi 
			where a.modul = 'AJUBEBAN' and a.kode_lokasi='11' and ( isnull(b.no_kas,'-') <> '-' or (a.no_ref1<>'-') ) 
			group by a.kode_proyek,a.kode_lokasi,a.periode_sch )b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi 
left join (select a.kode_proyek,a.kode_lokasi,a.periode_sch,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as beban_real 
			from prb_prbeban_d a 
			left join (select a.no_aju,a.no_kas,a.kode_lokasi 
						from it_aju_m a 
						inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi 
						where b.kode_lokasi='11' ) b on a.no_bukti = b.no_aju and a.kode_lokasi=b.kode_lokasi 
			where a.modul = 'AJUBEBAN' and a.kode_lokasi='11' and ( isnull(b.no_kas,'-') <> '-' or (a.no_ref1<>'-')) 
			and a.jenis <> 'NONITAJU'
			group by a.kode_proyek,a.kode_lokasi,a.periode_sch )bb on a.kode_proyek=bb.kode_proyek and a.kode_lokasi=bb.kode_lokasi 
left join (select substring(a.keterangan,23,14) as kode_proyek,a.kode_lokasi,sum(a.nilai) as pbyr 
			from trans_j a 
			where a.kode_lokasi='11' and a.jenis='PIU' and a.modul='PIUPRO' 
			group by substring(a.keterangan,23,14),a.kode_lokasi) pb on a.kode_proyek=pb.kode_proyek and a.kode_lokasi=pb.kode_lokasi 
left join (select c.kode_proyek,a.kode_lokasi,sum(a.nilai) as ppn 
			from trans_j a 
			inner join prb_prbill_bayar b on a.no_bukti=b.no_rekon and a.kode_lokasi=b.kode_lokasi 
			left join prb_prbill_m c on b.no_bill=c.no_bill and b.kode_lokasi=c.kode_lokasi 
			where a.kode_lokasi='11' and a.jenis='HUTPPN' and a.modul='PIUPRO' 
			group by c.kode_proyek,a.kode_lokasi) pbn on a.kode_proyek=pbn.kode_proyek and a.kode_lokasi=pbn.kode_lokasi 
left join (select a.kode_proyek,a.kode_lokasi,count(*) as jum_ubah 
			from prb_proyektgl_his a 
			group by a.kode_proyek,a.kode_lokasi ) t on a.kode_proyek=t.kode_proyek and a.kode_lokasi=t.kode_lokasi 
inner join prb_cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi 
where(a.kode_lokasi = '11')and(dbo.fnPeriode(a.tgl_app) = '201612')and(a.kode_pp LIKE '%')and(a.kode_proyek LIKE '%') 
order by a.kode_proyek 