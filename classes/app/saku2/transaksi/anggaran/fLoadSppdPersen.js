window.app_saku2_transaksi_anggaran_fLoadSppdPersen = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_anggaran_fLoadSppdPersen.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_anggaran_fLoadSppdPersen";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Biaya Perjalanan Dinas (Cek Outlook): Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator;portalui_saiMemo");
		uses("portalui_saiGrid",true);		
		
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,maxLength:4,tipeText:ttAngka,change:[this,"doChange"]});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],visible:false}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No BPD", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_akun = new saiCBBL(this,{bound:[20,13,200,20],caption:"Akun BPD", multiSelection:false, maxLength:10, tag:2});		
		this.cb_pp = new saiCBBL(this,{bound:[20,11,200,20],caption:"PP", multiSelection:false, maxLength:10, tag:2});		
		this.e_total = new saiLabelEdit(this,{bound:[550,11,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bHitung = new button(this,{bound:[755,11,80,18],caption:"Hitung",click:[this,"doHitung"]});			
		this.bUpload = new portalui_uploader(this,{bound:[840,11,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
				
		this.pc1 = new pageControl(this,{bound:[20,20,900,410], childPage:["Data Biaya Perjalan Dinas","Pesan Kesalahan","Eval Outlook"]});				
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.childPage[0].width-5,this.pc1.childPage[0].height-40],colCount:17,tag:0,
				colTitle:["NIK","Nama","Band","Kode DRK","Nama DRK","Kode Rute","Nama Rute","Bulan","Jml Hari","Jml Trans","Tarif UH","Tarif Trans","Nilai UH","Nilai Trans","Total","Status","Kegiatan"],
				colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[150,70,80,80,80,60,60,60,60,60,150,80,150,70,60,150,60]],
				colFormat:[[8,9,10,11,12,13,14],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[5,14,690,280],labelWidth:0,tag:9,readOnly:true});		
		this.sg2 = new portalui_saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
				colTitle:["Kode Akun","Nama Akun","Bidang","Outlook","Growth","Nilai Maks","Sawal Usul","Usulan","Kelebihan"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,100,50,80,50,200,80]],
				colFormat:[[3,4,5,6,7,8],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],readOnly:true, defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg2, pager:[this,"doPager"]});		
		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,24);
				
		setTipeButton(tbSimpan);		
		this.setTabChildIndex();				
		
		if (this.app._userStatus=="A")
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Daftar PP",true);
		else this.cb_pp.setSQL("select kode_pp, nama from pp where kode_bidang ='"+this.app._kodeBidang+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Daftar PP",true);
		this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_akun in ('4122060001','4152010307','4122060005','4122060006') and kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun BPD",true);
		this.cb_akun.setText("4122060001");
		this.cb_pp.setText(this.app._kodePP);
		var tahun = parseFloat(this.dp_d1.year) + 1;
		this.e_tahun.setText(tahun);
		this.nik_user = this.app._nikUser;		
	}
};
window.app_saku2_transaksi_anggaran_fLoadSppdPersen.extend(window.portalui_childForm);
window.app_saku2_transaksi_anggaran_fLoadSppdPersen.implement({	
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.stsTampil = "LOAD";
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));
				this.sgn.rearrange();
				this.sgn.activePage = 0;				
			}else throw(data);					
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},	
	selectPage: function(sender,page){
		if (this.stsTampil == "LOAD") {
			var start = (page - 1) * 20;
			var finish = start + 20;
			finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
			this.sg1.clear();
			for (var i=start; i < finish;i++){
				line = this.dataUpload.rows[i];
				this.sg1.appendData([line.nik,line.nama,line.band,line.kode_drk,line.nama_drk,line.kode_rute,line.nama_rute,line.bulan,floatToNilai(line.jml_hari),floatToNilai(line.jml_trans),floatToNilai(line.tarif_uh),floatToNilai(line.tarif_trans),floatToNilai(line.nilai_uh),floatToNilai(line.nilai_trans),"0",line.status,line.kegiatan]);
			}
			this.sg1.setNoUrut(start);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		else {
			this.sg1.clear();
			var line;
			this.page = page;
			var start = (page - 1) * 20;
			var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
			for (var i=start;i<finish;i++){
				line = this.dataJU.rs.rows[i];							
				this.sg1.appendData([line.nik,line.nama,line.kode_band,line.kode_drk,line.nama_drk,line.kode_rute,line.nama_rute,line.bulan,floatToNilai(line.jml_hari),floatToNilai(line.jml_trans),floatToNilai(line.tarif_uh),floatToNilai(line.tarif_trans),floatToNilai(line.nilai_uh),floatToNilai(line.nilai_trans),floatToNilai(line.total),line.status,line.kegiatan]);
			}
		}
	},
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg1.clear(1); this.sg2.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_pd_m','no_pd',this.app._lokasi+"-PD"+this.e_tahun.getText()+".",'000'));
				}
				break;
			case "simpan" :	
					this.stsSimpan = "1";
					if (this.prog != "0") {
						system.alert(this,"Transaksi tidak valid.","Transaksi ABAU (BPD) telah di Close.");
						return false;
					}
					if (nilaiToFloat(this.e_total.getText()) <= 0 ) {
						system.alert(this,"Transaksi tidak valid.","Transaksi tidak boleh nol atau kurang.");
						return false;						
					}
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{	
							this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_pd_m','no_pd',this.app._lokasi+"-PD"+this.e_tahun.getText()+".",'000'));
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();																																											
							sql.add("insert into agg_pd_m(no_pd,tahun,kode_pp,kode_akun,nilai,kode_lokasi) values "+
									"('"+this.e_nb.getText()+"','"+this.e_tahun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_akun.getText()+"',"+parseNilai(this.e_total.getText())+",'"+this.app._lokasi+"')");							
							sql.add("insert into agg_pd_d(no_pd,kode_lokasi,tahun,nik,nama,kode_band,kode_drk,nama_drk,kode_rute,nama_rute,bulan,jml_hari,jml_trans,tarif_uh,tarif_trans,nilai_uh,nilai_trans,total,status,kegiatan,kode_pp) "+
									"select '"+this.e_nb.getText()+"',kode_lokasi,tahun,nik,nama,kode_band,kode_drk,nama_drk,kode_rute,nama_rute,bulan,jml_hari,jml_trans,tarif_uh,tarif_trans,nilai_uh,nilai_trans,total,status,kegiatan,kode_pp from agg_pd_tmp "+
									"where nik_user = '"+this.nik_user+"'");							
							sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) "+
									"select a.kode_lokasi,'-',a.kode_drk,0,b.kode_akun,a.kode_pp,a.tahun+a.bulan,a.bulan,1,1,a.total,a.tahun,a.no_pd,'BSPPD','0',a.status,a.kegiatan "+
									"from agg_pd_d a inner join agg_pd_m b on a.no_pd=b.no_pd and a.kode_lokasi=b.kode_lokasi "+
									"where b.no_pd ='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
							sql.add("delete from agg_pd_tmp where nik_user = '"+this.nik_user+"'");					
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
							setTipeButton(tbSimpan);
						}
					}
				break;
		}
	},
	doClick: function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_pd_m','no_pd',this.app._lokasi+"-PD"+this.e_tahun.getText()+".",'000'));
			this.cb_pp.setFocus();
		}		
	},			
	doChange: function(sender){	
		if (sender == this.e_tahun && this.e_tahun.getText()!= "") {						
			var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'ABAU' and tahun = '"+this.e_tahun.getText()+"'",true);
			if (typeof data == "object"){
				this.prog = data.rs.rows[0].progress;
			}			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_pd_m','no_pd',this.app._lokasi+"-PD"+this.e_tahun.getText()+".",'000'));
		}
	},
	doHitung:function(sender){				
		try {					
			this.e_total.setText("0");
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_pd_m','no_pd',this.app._lokasi+"-PD"+this.e_tahun.getText()+".",'000'));
			this.stsSimpan = "0";
			var line; var strSQL = "";
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();																																											
			sql.add("delete from agg_pd_tmp where nik_user = '"+this.nik_user+"'");
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];										
				sql.add("insert into agg_pd_tmp(no_pd,kode_lokasi,tahun,nik,nama,kode_band,kode_drk,nama_drk,kode_rute,nama_rute,bulan,jml_hari,jml_trans,tarif_uh,tarif_trans,nilai_uh,nilai_trans,total,status,kegiatan,kode_pp,nik_user) values "+
						"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_tahun.getText()+"','"+line.nik+"','-','-','"+line.kode_drk+"','-','"+line.kode_rute+"','-','"+line.bulan+"',"+line.jml_hari+","+line.jml_trans+",0,0,0,0,0,'E','"+line.kegiatan+"','"+this.cb_pp.getText()+"','"+this.nik_user+"')");
			}						
			sql.add("update a set a.nama=isnull(b.nama,'-'),a.kode_band=isnull(b.kode_band,'-'),a.nama_drk=isnull(c.nama,'-'),a.nama_rute=isnull(d.nama,'-'),"+
			        "             a.tarif_uh=isnull(b.nilai,0),a.tarif_trans=isnull(d.nilai,0),a.nilai_uh=a.jml_hari*isnull(b.nilai,0),a.nilai_trans=a.jml_trans*isnull(d.nilai,0),a.total=(a.jml_hari*isnull(b.nilai,0))+(a.jml_trans*isnull(d.nilai,0)) "+
					"from agg_pd_tmp a left join (select i.tahun,i.nik,i.nama,i.kode_band,j.nilai from agg_karyawan i inner join agg_pd_uhar j on substring(i.kode_band,1,2)=j.kode_band and i.tahun=j.tahun "+
					"                             where i.tahun='"+this.e_tahun.getText()+"') b on a.nik=b.nik and b.tahun=a.tahun "+
					"                  left join (select distinct x.kode_drk,x.nama,x.tahun from agg_drk x inner join agg_rkm y on x.kode_drk=y.kode_drk and x.tahun=y.tahun "+
					"                             where y.kode_akun ='"+this.cb_akun.getText()+"' and x.tahun='"+this.e_tahun.getText()+"') c on a.kode_drk=c.kode_drk and c.tahun=a.tahun "+
					"                  left join agg_pd_trans d on a.kode_rute=d.kode_rute and a.tahun=d.tahun "+
					"where a.nik_user = '"+this.nik_user+"'");
			this.dbLib.execArraySQL(sql);
			
			strSQL = "select sum(a.total) as total from agg_pd_tmp a "+
					 "where a.nik_user = '"+this.nik_user+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.e_total.setText(floatToNilai(line.total));
				} 
			}
			
			var temu = false;		
			var msg  = "";
			this.e_memo.setText("");			
			strSQL = "select nik+' - '+kode_drk+' - '+kode_rute+' - '+bulan  as databpd from agg_pd_tmp "+
					 "where (nama='-' or nama_drk='-' or nama_rute='-' or bulan not in ('01','02','03','04','05','06','07','08','09','10','11','12')) and nik_user = '"+this.nik_user+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																													
					temu = true;
					msg+= "NIK-DRK-Rute-Bulan tidak terdaftar (RKM Akun SPPD-nya). [kode : "+line.databpd+"]\n";
				}
			}
			
			if (!temu) {						
				this.stsTampil = "HITUNG";			
				strSQL = "select * from agg_pd_tmp where nik_user = '"+this.nik_user+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();				
					this.selectPage(undefined, 1);		
				} else this.sg1.clear(1);				
								
				var tahunSeb = parseFloat(this.e_tahun.getText())-1;
				strSQL = "select max(periode) as periode from agg_outlook where tahun = '"+tahunSeb+"' ";					 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						var perOutlook = line.periode;
					} 
				}																																																															
				strSQL = "select distinct a.kode_lokasi,'"+this.cb_akun.getText()+"' as kode_akun,'"+this.cb_akun.rightLabelCaption+"' as nama_akun, substring(a.kode_pp,3,1) as kode_pp,b.usul,isnull(c.usul_total,0) as usul_total,isnull(d.nilai_max,0) as nilai_max,case when isnull(d.outlook,0) = 0 then 0 else round(isnull(d.nilai_max,0)/isnull(d.outlook,0),2)*100 end as growth,isnull(d.outlook,0) as outlook,b.usul+isnull(c.usul_total,0)-isnull(d.nilai_max,0) as kelebihan "+
						"from agg_pd_tmp a "+						
						"inner join "+
						"( "+
						"select kode_lokasi,substring(kode_pp,3,1) as kode_pp,sum(total) as usul "+
						"from agg_pd_tmp  "+
						"where nik_user='"+this.nik_user+"' "+
						"group by kode_lokasi,substring(kode_pp,3,1) "+
						") b on a.kode_lokasi=b.kode_lokasi and substring(a.kode_pp,3,1)=b.kode_pp "+
						
						"inner join  "+
						"( "+
						"select kode_lokasi,substring(kode_pp,3,1) as kode_pp,sum(outlook) as outlook,round(sum(outlook*(100+persen)/100),0) as nilai_max "+
						"from agg_outlook "+
						"where periode = '"+perOutlook+"' and kode_lokasi='"+this.app._lokasi+"' and kode_akun='"+this.cb_akun.getText()+"' "+
						"group by kode_lokasi,substring(kode_pp,3,1) "+
						") d on a.kode_lokasi=d.kode_lokasi and substring(a.kode_pp,3,1)=d.kode_pp "+
						
						"left join "+
						"( "+
						"select kode_lokasi,substring(kode_pp,3,1) as kode_pp,sum(nilai) as usul_total "+
						"from agg_d  "+
						"where tahun = '"+this.e_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_akun ='"+this.cb_akun.getText()+"' "+
						"group by kode_lokasi,substring(kode_pp,3,1) "+
						") c on a.kode_lokasi=c.kode_lokasi and substring(a.kode_pp,3,1)=c.kode_pp "+					
						" "+
						"where isnull(d.nilai_max,0) < b.usul+isnull(c.usul_total,0) and a.nik_user='"+this.nik_user+"' ";												
				var data2 = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					this.e_total.setText("0");
					system.alert(this,"Transaksi tidak valid.","Daftar eval outlook.");					
					this.pc1.setActivePage(this.pc1.childPage[2]);
					this.dataJU2 = data2;									
					this.sgn2.setTotalPage(Math.ceil(data2.rs.rows.length/20));
					this.sgn2.rearrange();
					this.doTampilData(1);					
				} else this.sg2.clear(1);			
			}
			else {
				this.e_memo.setText(msg);
				this.e_total.setText("0");
				system.alert(this,"Transaksi tidak valid.","Lihat daftar kesalahan/eval outlook.");
			}		
		} catch(e) {
			systemAPI.alert(e);
		}
	},
	doTampilData: function(page) {
		this.sg2.clear(); 
		var line2;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU2.rs.rows.length? this.dataJU2.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line2 = this.dataJU2.rs.rows[i];
			this.sg2.appendData([line2.kode_akun,line2.nama_akun,line2.kode_pp,floatToNilai(line2.outlook),floatToNilai(line2.growth),floatToNilai(line2.nilai_max),floatToNilai(line2.usul_total),floatToNilai(line2.usul),floatToNilai(line2.kelebihan)]);			
		}
		this.sg2.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						if (this.stsSimpan=="1") {
							this.app._mainForm.pesan(2,"Transaksi Sukses tersimpan");
							this.app._mainForm.bClear.click();              
						}
					}else {
						system.info(this, result,"");											
						setTipeButton(tbSimpan);
					}
				break;
			}
		}		
	}	
});
