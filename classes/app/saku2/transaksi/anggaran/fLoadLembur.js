window.app_saku2_transaksi_anggaran_fLoadLembur = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_anggaran_fLoadLembur.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_anggaran_fLoadLembur";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Hitung Lembur (Cek Outlook): Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator;portalui_saiMemo");
		uses("portalui_saiGrid",true);		
		
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,maxLength:4,tipeText:ttAngka,change:[this,"doChange"]});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],visible:false}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.cb_drk = new saiCBBL(this,{bound:[20,11,200,20],caption:"Kode DRK", multiSelection:false, maxLength:10, tag:2});				
		this.e_total = new saiLabelEdit(this,{bound:[550,11,200,20],caption:"Total (Tahun)", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bHitung = new button(this,{bound:[755,11,80,18],caption:"Hitung",click:[this,"doHitung"]});
		this.bUpload = new portalui_uploader(this,{bound:[840,11,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
				
		this.pc1 = new pageControl(this,{bound:[20,20,900,410], childPage:["Data Biaya Lembur (per Bulan)","Pesan Kesalahan","Eval Outlook"]});				
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:11,tag:0,
				colTitle:["NIK","Kode PP","Band","Jumlah Jam","Jumlah Makan","Tarif Lembur","Tarif U. Makan","Nilai Lembur","Nilai U Makan","Total","Kode Akun"],
				colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[70,80,80,80,80,80,80,80,60,60,60]],
				colFormat:[[3,4,5,6,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],readOnly:true, defaultRow:1});		
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
		this.rearrangeChild(10,23);
				
		setTipeButton(tbSimpan);		
		this.setTabChildIndex();				
								
		var tahun = parseFloat(this.dp_d1.year) + 1;
		this.e_tahun.setText(tahun);		
		this.nik_user = this.app._nikUser;
	}
};
window.app_saku2_transaksi_anggaran_fLoadLembur.extend(window.portalui_childForm);
window.app_saku2_transaksi_anggaran_fLoadLembur.implement({	
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
				this.sg1.appendData([line.nik,line.kode_pp,line.band,floatToNilai(line.jumlah_jam),floatToNilai(line.jml_umakan),floatToNilai(line.tarif_lembur),floatToNilai(line.tarif_umakan),floatToNilai(line.nilai_ul),floatToNilai(line.nilai_uml),"0",line.kode_akun]);
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
				this.sg1.appendData([line.nik,line.kode_pp,line.band,floatToNilai(line.jumlah_jam),floatToNilai(line.jml_umakan),floatToNilai(line.tarif_lembur),floatToNilai(line.tarif_umakan),floatToNilai(line.nilai_ul),floatToNilai(line.nilai_uml),floatToNilai(line.total),line.kode_akun]);
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
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_lembur_m','no_lembur',this.app._lokasi+"-LBR"+this.e_tahun.getText()+".",'000'));
				}
				break;
			case "simpan" :		
					this.stsSimpan = "1";
					if (this.prog != "0") {
						system.alert(this,"Transaksi tidak valid.","Transaksi SDM telah di Close.");
						return false;
					}
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{	
							this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_lembur_m','no_lembur',this.app._lokasi+"-LBR"+this.e_tahun.getText()+".",'000'));
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();															
							sql.add("insert into agg_lembur_m(no_lembur,tahun,kode_drk,nilai,kode_lokasi,tgl_input,nik_user) values "+
									"('"+this.e_nb.getText()+"','"+this.e_tahun.getText()+"','"+this.cb_drk.getText()+"',"+parseNilai(this.e_total.getText())+",'"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"')");							
							sql.add("insert into agg_lembur_d(no_lembur,kode_lokasi,tahun,periode,nik,kode_pp,band,jumlah_jam,jml_umakan,tarif_lembur,tarif_umakan,nilai_ul,nilai_uml,total,kode_akun) "+
									"select '"+this.e_nb.getText()+"',kode_lokasi,tahun,periode,nik,kode_pp,band,jumlah_jam,jml_umakan,tarif_lembur,tarif_umakan,nilai_ul,nilai_uml,total,kode_akun from agg_lembur_tmp "+
									"where nik_user = '"+this.nik_user+"'");											
							sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) "+
									"select a.kode_lokasi,'-',b.kode_drk,a.nik,a.kode_akun,a.kode_pp,a.periode,substring(a.periode,5,2),1,1,a.total,a.tahun,a.no_lembur,'BLEMBUR','0','E','"+this.cb_drk.rightLabelCaption+"' "+
									"from agg_lembur_d a inner join agg_lembur_m b on a.no_lembur=b.no_lembur and a.kode_lokasi=b.kode_lokasi "+
									"where b.no_lembur ='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
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
	doChange: function(sender){	
		if (sender == this.e_tahun && this.e_tahun.getText()!= "") {						
			var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'SDM' and tahun = '"+this.e_tahun.getText()+"'",true);
			if (typeof data == "object"){
				this.prog = data.rs.rows[0].progress;
			}
			this.cb_drk.setSQL("select distinct kode_drk, kegiatan from agg_rkm where kode_akun='4112010206' and tahun='"+this.e_tahun.getText()+"'",["kode_drk","kegiatan"],false,["Kode","Nama"],"and","Daftar DRK",true);		
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_lembur_m','no_lembur',this.app._lokasi+"-LBR"+this.e_tahun.getText()+".",'000'));
		}		
	},
	doClick: function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_lembur_m','no_lembur',this.app._lokasi+"-LBR"+this.e_tahun.getText()+".",'000'));
			this.cb_pp.setFocus();
		}		
	},			
	doHitung:function(sender){										
		try {	
			this.e_total.setText("0");
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_lembur_m','no_lembur',this.app._lokasi+"-LBR"+this.e_tahun.getText()+".",'000'));
			this.stsSimpan = "0";
			var line; var strSQL = "";
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();																																											
			sql.add("delete from agg_lembur_tmp where nik_user = '"+this.nik_user+"'");
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];				
				for (var j=1; j < 13;j++){
					sql.add("insert into agg_lembur_tmp(no_lembur,kode_lokasi,tahun,periode,nik,kode_pp,band,jumlah_jam,jml_umakan,tarif_lembur,tarif_umakan,nilai_ul,nilai_uml,total,kode_akun,nik_user) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_tahun.getText()+"','"+this.e_tahun.getText()+(j<10?"0":"")+j+"','"+line.nik+"','-','-',"+line.jumlah_jam+","+line.jml_umakan+",0,0,0,0,0,'"+line.kode_akun+"','"+this.nik_user+"')");
				}
			}						
			sql.add("update a set a.kode_pp=isnull(b.kode_pp,'-'),a.band=isnull(b.kode_band,'-'), "+
			        "             a.tarif_lembur=isnull(b.nilai,0),a.tarif_umakan=isnull(c.nilai,0),  "+
					"			  a.nilai_ul= isnull(b.nilai,0) * a.jumlah_jam,"+
					"			  a.nilai_uml=isnull(c.nilai,0) * a.jml_umakan,"+
					"             a.total= (isnull(b.nilai,0) * a.jumlah_jam) + (isnull(c.nilai,0) * a.jml_umakan) "+
					"from agg_lembur_tmp a left join (select i.tahun,i.nik,i.kode_band,i.kode_pp,j.nilai from agg_karyawan i inner join agg_norma_fix j on i.kode_band=j.kode_band and i.tahun=j.tahun and j.kode_param='UL' "+
					"                                 where i.tahun='"+this.e_tahun.getText()+"') b on a.nik=b.nik and b.tahun=a.tahun "+
					"                      left join (select i.tahun,i.nik,j.nilai from agg_karyawan i inner join agg_norma_fix j on i.kode_band=j.kode_band and i.tahun=j.tahun and j.kode_param='UML' "+
					"                                 where i.tahun='"+this.e_tahun.getText()+"') c on a.nik=c.nik and c.tahun=a.tahun "+
					"where a.nik_user = '"+this.nik_user+"'");
			this.dbLib.execArraySQL(sql);			
			strSQL = "select sum(a.total) as total from agg_lembur_tmp a "+
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
			strSQL = "select distinct nik from agg_lembur_tmp "+
					 "where (kode_pp='-' or band='-') and nik_user = '"+this.nik_user+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																													
					temu = true;
					msg+= "PP dan Band untuk NIK tidak terdaftar. [kode : "+line.nik+"]\n";
				}
			}			
			if (!temu) {						
				this.stsTampil = "HITUNG";			
				strSQL = "select * from agg_lembur_tmp where substring(periode,5,2) = '01' and nik_user = '"+this.nik_user+"'";
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
				strSQL = "select distinct a.kode_lokasi,x.nama as nama_akun, a.kode_akun,i.kode_bidang as kode_pp,b.usul,isnull(c.usul_total,0) as usul_total,isnull(d.nilai_max,0) as nilai_max,case when isnull(d.outlook,0) = 0 then 0 else round(isnull(d.nilai_max,0)/isnull(d.outlook,0),2)*100 end as growth,isnull(d.outlook,0) as outlook,b.usul+isnull(c.usul_total,0)-isnull(d.nilai_max,0) as kelebihan "+
						"from agg_lembur_tmp a "+
						"inner join masakun x on a.kode_akun = x.kode_akun and a.kode_lokasi=x.kode_lokasi "+
						"inner join pp i on a.kode_pp = i.kode_pp and i.kode_lokasi='"+this.app._lokasi+"' "+
						"inner join "+
						"( "+
						"select j.kode_lokasi,j.kode_akun,i.kode_bidang as kode_pp,sum(j.total) as usul "+
						"from agg_lembur_tmp j "+
						"inner join pp i on j.kode_pp = i.kode_pp and i.kode_lokasi='"+this.app._lokasi+"' "+
						"where j.nik_user='"+this.nik_user+"' "+
						"group by j.kode_lokasi,j.kode_akun,i.kode_bidang "+
						") b on a.kode_lokasi=b.kode_lokasi and a.kode_akun=b.kode_akun and i.kode_bidang=b.kode_pp "+
						
						"left join  "+
						"( "+
						"select j.kode_lokasi,j.kode_akun,i.kode_bidang as kode_pp,sum(j.outlook) as outlook,round(sum(j.outlook*(100+persen)/100),0) as nilai_max "+
						"from agg_outlook j "+
						"inner join pp i on j.kode_pp = i.kode_pp and i.kode_lokasi='"+this.app._lokasi+"' "+
						"where j.periode = '"+perOutlook+"' and j.kode_lokasi='"+this.app._lokasi+"' "+
						"group by j.kode_lokasi,j.kode_akun,i.kode_bidang "+
						") d on a.kode_lokasi=d.kode_lokasi and a.kode_akun=d.kode_akun and i.kode_bidang=d.kode_pp "+
						
						"left join "+
						"( "+
						"select j.kode_lokasi,j.kode_akun,i.kode_bidang as kode_pp,sum(j.nilai) as usul_total "+
						"from agg_d j "+
						"inner join pp i on j.kode_pp = i.kode_pp and i.kode_lokasi='"+this.app._lokasi+"' "+
						"where j.tahun = '"+this.e_tahun.getText()+"' and j.kode_lokasi='"+this.app._lokasi+"' "+
						"group by j.kode_lokasi,j.kode_akun,i.kode_bidang "+
						") c on a.kode_lokasi=c.kode_lokasi and a.kode_akun=c.kode_akun and i.kode_bidang=c.kode_pp "+					
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
