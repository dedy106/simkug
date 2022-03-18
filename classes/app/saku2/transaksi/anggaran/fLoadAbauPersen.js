window.app_saku2_transaksi_anggaran_fLoadAbauPersen = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_anggaran_fLoadAbauPersen.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_anggaran_fLoadAbauPersen";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Angg. Biaya Adm dan Umum (Cek Outlook): Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator;portalui_saiMemo");
		uses("portalui_saiGrid",true);		
		
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,maxLength:4,tipeText:ttAngka,change:[this,"doChange"]});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],visible:false}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No ABAU", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_bidang = new saiCBBL(this,{bound:[20,11,200,20],caption:"Bidang", multiSelection:false, maxLength:10, tag:2});				
		this.e_total = new saiLabelEdit(this,{bound:[640,11,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bHitung = new button(this,{bound:[845,11,80,18],caption:"Hitung",click:[this,"doHitung"]});			
		this.bUpload = new portalui_uploader(this,{bound:[930,11,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.pc1 = new pageControl(this,{bound:[20,20,990,410], childPage:["Data Angg. Biaya Adm dan Umum","Pesan Kesalahan","Eval Outlook"]});		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:12,tag:0,
				colTitle:["Kode DRK","Nama DRK","Kegiatan","Kode Akun","Kode PP","Kode Variabel","Tarif","Jumlah","Volume","Bulan","Total","Status"],
				colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[60,80,60,80,80,80,80,60,80,150,150,80]],
				colFormat:[[6,7,10],[cfNilai,cfNilai,cfNilai]],readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[5,14,690,280],labelWidth:0,tag:9,readOnly:true});
		
		this.sg2 = new portalui_saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
				colTitle:["Kode Akun","Nama Akun","Bidang","Outlook","Growth","Nilai Maks","Sawal Usul","Usulan","Kelebihan"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,100,50,80,50,200,80]],
				colFormat:[[3,4,5,6,7,8],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],readOnly:true, defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll, grid:this.sg2, pager:[this,"doPager"]});		
		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
				
		setTipeButton(tbSimpan);		
		this.setTabChildIndex();				
		
		if (this.app._userStatus=="A")
			this.cb_bidang.setSQL("select kode_bidang, nama from bidang",["kode_bidang","nama"],false,["Kode","Nama"],"where","Daftar Bidang",true);		
		else this.cb_bidang.setSQL("select kode_bidang, nama from bidang where kode_bidang='"+this.app._kodeBidang+"'",["kode_bidang","nama"],false,["Kode","Nama"],"and","Daftar Bidang",true);		
		var tahun = parseFloat(this.dp_d1.year) + 1;
		this.e_tahun.setText(tahun);			
		this.nik_user = this.app._nikUser;		
	}
};
window.app_saku2_transaksi_anggaran_fLoadAbauPersen.extend(window.portalui_childForm);
window.app_saku2_transaksi_anggaran_fLoadAbauPersen.implement({	
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
			this.sg2.clear();
			var start = (page - 1) * 20;
			var finish = start + 20;		
			finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
			this.sg1.clear();
			for (var i=start; i < finish;i++){
				line = this.dataUpload.rows[i];			
				this.sg1.appendData([line.kode_drk,line.nama_drk,line.kegiatan,line.kode_akun,line.kode_pp,line.kode_var,floatToNilai(line.tarif),floatToNilai(line.jumlah),floatToNilai(line.volume),line.bulan,"0",line.status]);
			}
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
				this.sg1.appendData([line.kode_drk,line.nama_drk,line.kegiatan,line.kode_akun,line.kode_pp,line.kode_var,floatToNilai(line.tarif),floatToNilai(line.jumlah),floatToNilai(line.volume),line.bulan,floatToNilai(line.total),line.status]);
			}
		}
		this.sg1.setNoUrut(start);
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abau_m','no_abau',this.app._lokasi+"-ABAU"+this.e_tahun.getText()+".",'000'));
				}
				break;
			case "simpan" :		
					this.stsSimpan = "1";
					if (this.prog != "0") {
						system.alert(this,"Transaksi tidak valid.","Transaksi ABAU telah di Close.");
						return false;
					}
					if (nilaiToFloat(this.e_total.getText()) <= 0 ) {
						system.alert(this,"Transaksi tidak valid.","Transaksi tidak boleh nol atau kurang.");
						return false;						
					}
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{							
							this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abau_m','no_abau',this.app._lokasi+"-ABAU"+this.e_tahun.getText()+".",'000'));
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();																																											
							sql.add("insert into agg_abau_m(no_abau,kode_lokasi,kode_bidang,tahun,nilai,tgl_input,nik_user) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_bidang.getText()+"','"+this.e_tahun.getText()+"',"+parseNilai(this.e_total.getText())+",getdate(),'"+this.app._userLog+"')");							
							sql.add("insert into agg_abau_d(no_abau,kode_lokasi,tahun,kode_drk,kegiatan,kode_akun,kode_pp,kode_var,tarif,jumlah,volume,bulan,periode,total,status) "+
									"select '"+this.e_nb.getText()+"',kode_lokasi,tahun,kode_drk,kegiatan,kode_akun,kode_pp,kode_var,tarif,jumlah,volume,bulan,periode,total,status from agg_abau_tmp "+
									"where nik_user = '"+this.nik_user+"'");
							sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) "+
									"select kode_lokasi,'-',kode_drk,0,kode_akun,kode_pp,periode,bulan,jumlah,volume,total,tahun,no_abau,'ABAU','0',status,kegiatan "+
									"from agg_abau_d  "+
									"where no_abau='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
							sql.add("delete from agg_abau_tmp where nik_user = '"+this.nik_user+"'");
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abau_m','no_abau',this.app._lokasi+"-ABAU"+this.e_tahun.getText()+".",'000'));
			this.cb_bidang.setFocus();
		}		
	},	
	doChange: function(sender){	
		if (sender == this.e_tahun && this.e_tahun.getText()!= "") {						
			var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'ABAU' and tahun = '"+this.e_tahun.getText()+"'",true);
			if (typeof data == "object"){
				this.prog = data.rs.rows[0].progress;
			}			
		}
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abau_m','no_abau',this.app._lokasi+"-ABAU"+this.e_tahun.getText()+".",'000'));
	},	
	doHitung:function(sender){		
		try {
			this.e_total.setText("0");
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abau_m','no_abau',this.app._lokasi+"-ABAU"+this.e_tahun.getText()+".",'000'));
			this.stsSimpan = "0";
			var line; var strSQL = "";
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();																																											
			sql.add("delete from agg_abau_tmp where nik_user = '"+this.nik_user+"'");		
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];										
				sql.add("insert into agg_abau_tmp(no_abau,kode_lokasi,tahun,kode_drk,kegiatan,kode_akun,kode_pp,kode_var,tarif,jumlah,volume,bulan,periode,total,status,nik_user) values "+
						"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_tahun.getText()+"','"+line.kode_drk+"','"+line.kegiatan+"','"+line.kode_akun+"','"+line.kode_pp+"','"+line.kode_var+"',"+line.tarif+","+line.jumlah+","+line.volume+",'"+line.bulan+"','"+this.e_tahun.getText()+line.bulan+"',"+line.total+",'"+line.status+"','"+this.nik_user+"')"); 			
			}						
			sql.add("update a set a.tarif=b.tarif,total=b.tarif * a.jumlah * a.volume "+
					"from agg_abau_tmp a inner join agg_norma_var b on a.kode_var=b.kode_var and a.kode_akun=b.kode_akun and b.tahun='"+this.e_tahun.getText()+"' "+
					"where a.nik_user = '"+this.nik_user+"'");
			this.dbLib.execArraySQL(sql);
			
			strSQL = "select sum(a.total) as total from agg_abau_tmp a "+
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
			strSQL = "select a.kode_drk "+
					 "from agg_abau_tmp a left join agg_drk b on a.kode_drk=b.kode_drk and b.tahun='"+this.e_tahun.getText()+"' "+
					 "where b.kode_drk is null and a.nik_user = '"+this.nik_user+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																													
					temu = true;
					msg+= "DRK tidak terdaftar. [kode : "+line.kode_drk+"]\n";
				}
			}
			strSQL = "select a.kode_akun "+
					 "from agg_abau_tmp a left join masakun b on a.kode_akun=b.kode_akun and b.kode_lokasi='"+this.app._lokasi+"' "+
					 "where b.kode_akun is null and a.nik_user = '"+this.nik_user+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																													
					temu = true;
					msg+= "Akun tidak terdaftar. [kode : "+line.kode_akun+"]\n";
				}
			}
			strSQL = "select a.kode_pp "+
					 "from agg_abau_tmp a left join pp b on a.kode_pp=b.kode_pp and b.kode_lokasi='"+this.app._lokasi+"' and b.flag_aktif='1' and b.tipe='posting' "+
					 "where b.kode_pp is null and a.nik_user = '"+this.nik_user+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																													
					temu = true;
					msg+= "PP tidak terdaftar. [kode : "+line.kode_pp+"]\n";
				}
			}
			if (this.app._lokasi == "99") var status = " and b.status in('P/A','P') ";
			else var status = " and b.status in('P/A','A') ";
			strSQL = "select a.kode_var "+
					 "from agg_abau_tmp a left join agg_var b on a.kode_var=b.kode_var and b.tahun='"+this.e_tahun.getText()+"' "+status+" "+
					 "where b.kode_var is null and a.nik_user = '"+this.nik_user+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																													
					temu = true;
					msg+= "Variabel tidak terdaftar. [kode : "+line.kode_var+"]\n";
				}
			}		 			
			strSQL = "select a.bulan "+
					 "from agg_abau_tmp a "+
					 "where a.bulan not in ('01','02','03','04','05','06','07','08','09','10','11','12') and a.nik_user = '"+this.nik_user+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																													
					temu = true;
					msg+= "Bulan tidak terdaftar. [kode : "+line.bulan+"]\n";
				}
			}			
			
			if (!temu) {						
				this.stsTampil = "HITUNG";			
				strSQL = "select a.*,b.nama as nama_drk from agg_abau_tmp a inner join agg_drk b on a.kode_drk=b.kode_drk and b.tahun ='"+this.e_tahun.getText()+"' where a.nik_user = '"+this.nik_user+"'";
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
				/*				
				strSQL = "select distinct a.kode_lokasi,x.nama as nama_akun, a.kode_akun,substring(a.kode_pp,3,1) as kode_pp,b.usul,isnull(c.usul_total,0) as usul_total,d.nilai_max,case when d.outlook=0 then 0 else round(d.nilai_max/d.outlook,2)*100 end as growth,d.outlook,b.usul+isnull(c.usul_total,0)-d.nilai_max as kelebihan "+
						"from agg_abau_tmp a "+
						"inner join masakun x on a.kode_akun = x.kode_akun and a.kode_lokasi=x.kode_lokasi "+
						"inner join "+
						"( "+
						"select kode_lokasi,kode_akun,substring(kode_pp,3,1) as kode_pp,sum(total) as usul "+
						"from agg_abau_tmp  "+
						"where nik_user='"+this.nik_user+"' "+
						"group by kode_lokasi,kode_akun,substring(kode_pp,3,1) "+
						") b on a.kode_lokasi=b.kode_lokasi and a.kode_akun=b.kode_akun and substring(a.kode_pp,3,1)=b.kode_pp "+
						
						"inner join  "+
						"( "+
						"select kode_lokasi,kode_akun,substring(kode_pp,3,1) as kode_pp,sum(outlook) as outlook,round(sum(outlook*(100+persen)/100),0) as nilai_max "+
						"from agg_outlook "+
						"where periode = '"+perOutlook+"' and kode_lokasi='"+this.app._lokasi+"' "+
						"group by kode_lokasi,kode_akun,substring(kode_pp,3,1) "+
						") d on a.kode_lokasi=d.kode_lokasi and a.kode_akun=d.kode_akun and substring(a.kode_pp,3,1)=d.kode_pp "+
						
						"left join "+
						"( "+
						"select kode_lokasi,kode_akun,substring(kode_pp,3,1) as kode_pp,sum(nilai) as usul_total "+
						"from agg_d  "+
						"where tahun = '"+this.e_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
						"group by kode_lokasi,kode_akun,substring(kode_pp,3,1) "+
						") c on a.kode_lokasi=c.kode_lokasi and a.kode_akun=c.kode_akun and substring(a.kode_pp,3,1)=c.kode_pp "+					
						" "+
						"where d.nilai_max <> 0 and d.nilai_max < b.usul+isnull(c.usul_total,0) and a.nik_user='"+this.nik_user+"' ";								
					
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
				*/
			}
			else {
				this.e_memo.setText(msg);
				this.e_total.setText("0");
				system.alert(this,"Transaksi tidak valid.","Lihat daftar kesalahan/eval outlook.");
			}						
		}catch(e) {
			alert(e);
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
