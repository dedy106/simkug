window.app_saku2_transaksi_anggaran_fHitungBpcc = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_anggaran_fHitungBpcc.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_anggaran_fHitungBpcc";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Hitung BPCC: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,maxLength:4,tipeText:ttAngka,change:[this,"doChange"]});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],visible:false}); 				
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti", readOnly:true});		
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[20,11,150,20],caption:"Nilai Kunj",tag:2,tipeText:ttNilai});
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();					
			
			var tahun = parseFloat(this.dp_d1.year) + 1;
			this.e_tahun.setText(tahun);					
			this.e_nilai.setText("14.500");
			this.e_nb.setText("BPCC"+tahun);					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_anggaran_fHitungBpcc.extend(window.childForm);
window.app_saku2_transaksi_anggaran_fHitungBpcc.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{						
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_pembina_m','no_pembina',this.app._lokasi+"-PMBN"+this.e_tahun.getText()+".",'000'));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					sql.add("delete from agg_d where modul in ('BO','CC') and tahun= '"+this.e_tahun.getText()+"'");
					
					var strSQL = "select kode_lokasi,'01' as bulan,status, "+
								 "sum(rjtp01) as rjtp01,sum(rjtl01) as rjtl01,sum(ri01) as ri01,sum(res01) as res01, "+
								 "sum(rjtpk01)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtpk01, "+
								 "sum(rjtlk01)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtlk01, "+
								 "sum(rik01)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rik01, "+
								 "sum(resk01)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as resk01 "+
								 "from agg_bpcc_d where tahun ='"+this.e_tahun.getText()+"' "+
								 "group by kode_lokasi,status "+
								 "union "+
								 "select kode_lokasi,'02' as bulan,status, "+
								 "sum(rjtp02) as rjtp02,sum(rjtl02) as rjtl02,sum(ri02) as ri02,sum(res02) as res02, "+
								 "sum(rjtpk02)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtpk02, "+
								 "sum(rjtlk02)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtlk02, "+
								 "sum(rik02)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rik02, "+
								 "sum(resk02)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as resk02 "+
								 "from agg_bpcc_d where tahun ='"+this.e_tahun.getText()+"' "+
								 "group by kode_lokasi,status "+
								 "union "+
								 "select kode_lokasi,'03' as bulan,status, "+
								 "sum(rjtp03) as rjtp03,sum(rjtl03) as rjtl03,sum(ri03) as ri03,sum(res03) as res03, "+
								 "sum(rjtpk03)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtpk03, "+
								 "sum(rjtlk03)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtlk03, "+
								 "sum(rik03)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rik03, "+
								 "sum(resk03)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as resk03 "+
								 "from agg_bpcc_d where tahun ='"+this.e_tahun.getText()+"' "+
								 "group by kode_lokasi,status "+
								 "union "+
								 "select kode_lokasi,'04' as bulan,status, "+
								 "sum(rjtp04) as rjtp04,sum(rjtl04) as rjtl04,sum(ri04) as ri04,sum(res04) as res04, "+
								 "sum(rjtpk04)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtpk04, "+
								 "sum(rjtlk04)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtlk04, "+
								 "sum(rik04)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rik04, "+
								 "sum(resk04)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as resk04 "+
								 "from agg_bpcc_d where tahun ='"+this.e_tahun.getText()+"' "+
								 "group by kode_lokasi,status "+
								 "union "+
								 "select kode_lokasi,'05' as bulan,status, "+
								 "sum(rjtp05) as rjtp05,sum(rjtl05) as rjtl05,sum(ri05) as ri05,sum(res05) as res05, "+
								 "sum(rjtpk05)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtpk05, "+
								 "sum(rjtlk05)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtlk05, "+
								 "sum(rik05)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rik05, "+
								 "sum(resk05)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as resk05 "+
								 "from agg_bpcc_d where tahun ='"+this.e_tahun.getText()+"' "+
								 "group by kode_lokasi,status "+
								 "union "+
								 "select kode_lokasi,'06' as bulan,status, "+
								 "sum(rjtp06) as rjtp06,sum(rjtl06) as rjtl06,sum(ri06) as ri06,sum(res06) as res06, "+
								 "sum(rjtpk06)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtpk06, "+
								 "sum(rjtlk06)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtlk06, "+
								 "sum(rik06)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rik06, "+
								 "sum(resk06)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as resk06 "+
								 "from agg_bpcc_d where tahun ='"+this.e_tahun.getText()+"' "+
								 "group by kode_lokasi,status "+
								 "union "+
								 "select kode_lokasi,'07' as bulan,status, "+
								 "sum(rjtp07) as rjtp07,sum(rjtl07) as rjtl07,sum(ri07) as ri07,sum(res07) as res07, "+
								 "sum(rjtpk07)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtpk07, "+
								 "sum(rjtlk07)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtlk07, "+
								 "sum(rik07)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rik07, "+
								 "sum(resk07)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as resk07 "+
								 "from agg_bpcc_d where tahun ='"+this.e_tahun.getText()+"' "+
								 "group by kode_lokasi,status "+
								 "union "+
								 "select kode_lokasi,'08' as bulan,status, "+
								 "sum(rjtp08) as rjtp08,sum(rjtl08) as rjtl08,sum(ri08) as ri08,sum(res08) as res08, "+
								 "sum(rjtpk08)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtpk08, "+
								 "sum(rjtlk08)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtlk08, "+
								 "sum(rik08)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rik08, "+
								 "sum(resk08)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as resk08 "+
								 "from agg_bpcc_d where tahun ='"+this.e_tahun.getText()+"' "+
								 "group by kode_lokasi,status "+
								 "union "+
								 "select kode_lokasi,'09' as bulan,status, "+
								 "sum(rjtp09) as rjtp09,sum(rjtl09) as rjtl09,sum(ri09) as ri09,sum(res09) as res09, "+
								 "sum(rjtpk09)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtpk09, "+
								 "sum(rjtlk09)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtlk09, "+
								 "sum(rik09)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rik09, "+
								 "sum(resk09)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as resk09 "+
								 "from agg_bpcc_d where tahun ='"+this.e_tahun.getText()+"' "+
								 "group by kode_lokasi,status "+
								 "union "+
								 "select kode_lokasi,'10' as bulan,status, "+
								 "sum(rjtp10) as rjtp10,sum(rjtl10) as rjtl10,sum(ri10) as ri10,sum(res10) as res10, "+
								 "sum(rjtpk10)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtpk10, "+
								 "sum(rjtlk10)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtlk10, "+
								 "sum(rik10)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rik10, "+
								 "sum(resk10)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as resk10 "+
								 "from agg_bpcc_d where tahun ='"+this.e_tahun.getText()+"' "+
								 "group by kode_lokasi,status "+
								 "union "+
								 "select kode_lokasi,'11' as bulan,status, "+
								 "sum(rjtp11) as rjtp11,sum(rjtl11) as rjtl11,sum(ri11) as ri11,sum(res11) as res11, "+
								 "sum(rjtpk11)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtpk11, "+
								 "sum(rjtlk11)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtlk11, "+
								 "sum(rik11)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rik11, "+
								 "sum(resk11)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as resk11 "+
								 "from agg_bpcc_d where tahun ='"+this.e_tahun.getText()+"' "+
								 "group by kode_lokasi,status "+
								 "union "+
								 "select kode_lokasi,'12' as bulan,status, "+
								 "sum(rjtp12) as rjtp12,sum(rjtl12) as rjtl12,sum(ri12) as ri12,sum(res12) as res12, "+
								 "sum(rjtpk12)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtpk12, "+
								 "sum(rjtlk12)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rjtlk12, "+
								 "sum(rik12)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as rik12, "+
								 "sum(resk12)* case status when 'BP' then "+parseNilai(this.e_nilai.getText())+" else 0 end as resk12 "+
								 "from agg_bpcc_d where tahun ='"+this.e_tahun.getText()+"' "+
								 "group by kode_lokasi,status ";

					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;						
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							if (line.status == "BO") {
								var rjtp = "1151010000";
								var rjtl = "1151020000";
								var ri = "1151030000";
								var res = "1151040000";								
								sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) values "+
										"'"+line.kode_lokasi+"','-','900000001','-','1151090301','"+line.kode_lokasi+'1000'+"','"+this.e_tahun.getText()+line.bulan+"','"+line.bulan+"',1,1,"+line.rjtpk01+",'"+this.e_tahun.getText()+"','PKUNJ"+this.e_tahun.getText()+"','"+line.status+"','0','E','Kunjungan RJTP'");
								sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) values "+
										"'"+line.kode_lokasi+"','-','900000001','-','1151090302','"+line.kode_lokasi+'1000'+"','"+this.e_tahun.getText()+line.bulan+"','"+line.bulan+"',1,1,"+line.rjtlk01+",'"+this.e_tahun.getText()+"','PKUNJ"+this.e_tahun.getText()+"','"+line.status+"','0','E','Kunjungan RJTL'");
								sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) values "+
										"'"+line.kode_lokasi+"','-','900000001','-','1151090303','"+line.kode_lokasi+'1000'+"','"+this.e_tahun.getText()+line.bulan+"','"+line.bulan+"',1,1,"+line.rik01+",'"+this.e_tahun.getText()+"','PKUNJ"+this.e_tahun.getText()+"','"+line.status+"','0','E','Kunjungan RI'");
								sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) values "+
										"'"+line.kode_lokasi+"','-','900000001','-','1151090304','"+line.kode_lokasi+'1000'+"','"+this.e_tahun.getText()+line.bulan+"','"+line.bulan+"',1,1,"+line.resk01+",'"+this.e_tahun.getText()+"','PKUNJ"+this.e_tahun.getText()+"','"+line.status+"','0','E','Kunjungan Restitusi'");
							}
							else {
								var rjtp = "5302010000";
								var rjtl = "5302020000";
								var ri = "5302030000";
								var res = "5302040000";							
							}							
							sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) values "+
									"'"+line.kode_lokasi+"','-','900000001','-','"+rjtp+"','"+line.kode_lokasi+'1000'+"','"+this.e_tahun.getText()+line.bulan+"','"+line.bulan+"',1,1,"+line.rjtp01+",'"+this.e_tahun.getText()+"','BPCC"+this.e_tahun.getText()+"','"+line.status+"','0','E','RJTP BP dan CC'");
							sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) values "+
									"'"+line.kode_lokasi+"','-','900000001','-','"+rjtl+"','"+line.kode_lokasi+'1000'+"','"+this.e_tahun.getText()+line.bulan+"','"+line.bulan+"',1,1,"+line.rjtl01+",'"+this.e_tahun.getText()+"','BPCC"+this.e_tahun.getText()+"','"+line.status+"','0','E','RJTL BP dan CC'");
							sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) values "+
									"'"+line.kode_lokasi+"','-','900000001','-','"+ri+"','"+line.kode_lokasi+'1000'+"','"+this.e_tahun.getText()+line.bulan+"','"+line.bulan+"',1,1,"+line.ri01+",'"+this.e_tahun.getText()+"','BPCC"+this.e_tahun.getText()+"','"+line.status+"','0','E','RI BP dan CC'");
							sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) values "+
									"'"+line.kode_lokasi+"','-','900000001','-','"+res+"','"+line.kode_lokasi+'1000'+"','"+this.e_tahun.getText()+line.bulan+"','"+line.bulan+"',1,1,"+line.res01+",'"+this.e_tahun.getText()+"','BPCC"+this.e_tahun.getText()+"','"+line.status+"','0','E','Restitusi BP dan CC'");									
						}
					}					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
					 this.simpan();
				break;							
		}	
	},				
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
							this.clearLayar();						
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);			
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});

/* 2013-2014 setelah mask tabel agg_bpcc dengan manual

insert into agg_d (kode_lokasi, kode_pk, kode_drk, kode_rka, kode_akun, kode_pp, periode, bulan, jumlah, volume, nilai, tahun, no_bukti, modul, jenis_agg, progress, keterangan)
select  kode_lokasi,'-',kode_drk,'-',kode_akun,kode_lokasi+'1000',  '201401','01',1,1,case when modul = 'KUNJ' then jan*14500 else jan end,'2014','BPCC2014',modul,'E','0',keterangan
from agg_bpcc where tahun='2014'

insert into agg_d (kode_lokasi, kode_pk, kode_drk, kode_rka, kode_akun, kode_pp, periode, bulan, jumlah, volume, nilai, tahun, no_bukti, modul, jenis_agg, progress, keterangan)
select  kode_lokasi,'-',kode_drk,'-',kode_akun,kode_lokasi+'1000',  '201402','02',1,1,case when modul = 'KUNJ' then feb*14500 else feb end,'2014','BPCC2014',modul,'E','0',keterangan
from agg_bpcc where tahun='2014'

insert into agg_d (kode_lokasi, kode_pk, kode_drk, kode_rka, kode_akun, kode_pp, periode, bulan, jumlah, volume, nilai, tahun, no_bukti, modul, jenis_agg, progress, keterangan)
select  kode_lokasi,'-',kode_drk,'-',kode_akun,kode_lokasi+'1000',  '201403','03',1,1,case when modul = 'KUNJ' then mar*14500 else mar end,'2014','BPCC2014',modul,'E','0',keterangan
from agg_bpcc where tahun='2014'

insert into agg_d (kode_lokasi, kode_pk, kode_drk, kode_rka, kode_akun, kode_pp, periode, bulan, jumlah, volume, nilai, tahun, no_bukti, modul, jenis_agg, progress, keterangan)
select  kode_lokasi,'-',kode_drk,'-',kode_akun,kode_lokasi+'1000',  '201404','04',1,1,case when modul = 'KUNJ' then apr*14500 else apr end,'2014','BPCC2014',modul,'E','0',keterangan
from agg_bpcc where tahun='2014'

insert into agg_d (kode_lokasi, kode_pk, kode_drk, kode_rka, kode_akun, kode_pp, periode, bulan, jumlah, volume, nilai, tahun, no_bukti, modul, jenis_agg, progress, keterangan)
select  kode_lokasi,'-',kode_drk,'-',kode_akun,kode_lokasi+'1000',  '201405','05',1,1,case when modul = 'KUNJ' then mei*14500 else mei end,'2014','BPCC2014',modul,'E','0',keterangan
from agg_bpcc where tahun='2014'

insert into agg_d (kode_lokasi, kode_pk, kode_drk, kode_rka, kode_akun, kode_pp, periode, bulan, jumlah, volume, nilai, tahun, no_bukti, modul, jenis_agg, progress, keterangan)
select  kode_lokasi,'-',kode_drk,'-',kode_akun,kode_lokasi+'1000',  '201406','06',1,1,case when modul = 'KUNJ' then jun*14500 else jun end,'2014','BPCC2014',modul,'E','0',keterangan
from agg_bpcc where tahun='2014'

insert into agg_d (kode_lokasi, kode_pk, kode_drk, kode_rka, kode_akun, kode_pp, periode, bulan, jumlah, volume, nilai, tahun, no_bukti, modul, jenis_agg, progress, keterangan)
select  kode_lokasi,'-',kode_drk,'-',kode_akun,kode_lokasi+'1000',  '201407','07',1,1,case when modul = 'KUNJ' then jul*14500 else jul end,'2014','BPCC2014',modul,'E','0',keterangan
from agg_bpcc where tahun='2014'

insert into agg_d (kode_lokasi, kode_pk, kode_drk, kode_rka, kode_akun, kode_pp, periode, bulan, jumlah, volume, nilai, tahun, no_bukti, modul, jenis_agg, progress, keterangan)
select  kode_lokasi,'-',kode_drk,'-',kode_akun,kode_lokasi+'1000',  '201408','08',1,1,case when modul = 'KUNJ' then agu*14500 else agu end,'2014','BPCC2014',modul,'E','0',keterangan
from agg_bpcc where tahun='2014'

insert into agg_d (kode_lokasi, kode_pk, kode_drk, kode_rka, kode_akun, kode_pp, periode, bulan, jumlah, volume, nilai, tahun, no_bukti, modul, jenis_agg, progress, keterangan)
select  kode_lokasi,'-',kode_drk,'-',kode_akun,kode_lokasi+'1000',  '201409','09',1,1,case when modul = 'KUNJ' then sep*14500 else sep end,'2014','BPCC2014',modul,'E','0',keterangan
from agg_bpcc where tahun='2014'

insert into agg_d (kode_lokasi, kode_pk, kode_drk, kode_rka, kode_akun, kode_pp, periode, bulan, jumlah, volume, nilai, tahun, no_bukti, modul, jenis_agg, progress, keterangan)
select  kode_lokasi,'-',kode_drk,'-',kode_akun,kode_lokasi+'1000',  '201410','10',1,1,case when modul = 'KUNJ' then okt*14500 else okt end,'2014','BPCC2014',modul,'E','0',keterangan
from agg_bpcc where tahun='2014'

insert into agg_d (kode_lokasi, kode_pk, kode_drk, kode_rka, kode_akun, kode_pp, periode, bulan, jumlah, volume, nilai, tahun, no_bukti, modul, jenis_agg, progress, keterangan)
select  kode_lokasi,'-',kode_drk,'-',kode_akun,kode_lokasi+'1000',  '201411','11',1,1,case when modul = 'KUNJ' then nop*14500 else nop end,'2014','BPCC2014',modul,'E','0',keterangan
from agg_bpcc where tahun='2014'

insert into agg_d (kode_lokasi, kode_pk, kode_drk, kode_rka, kode_akun, kode_pp, periode, bulan, jumlah, volume, nilai, tahun, no_bukti, modul, jenis_agg, progress, keterangan)
select  kode_lokasi,'-',kode_drk,'-',kode_akun,kode_lokasi+'1000',  '201412','12',1,1,case when modul = 'KUNJ' then des*14500 else des end,'2014','BPCC2014',modul,'E','0',keterangan
from agg_bpcc where tahun='2014'


*/