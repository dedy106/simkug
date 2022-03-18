window.app_saku2_transaksi_anggaran_fLoadDokter2014 = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_anggaran_fLoadDokter2014.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_anggaran_fLoadDokter2014";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Dokter TPKK Format2014: Load dan Hitung", 0);	
		
		this.maximize();		
		uses("portalui_saiMemo;portalui_saiCBB;portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,maxLength:4,tipeText:ttAngka,change:[this,"doChange"]});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],visible:false}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Gaji", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.bUpload = new portalui_uploader(this,{bound:[840,12,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
				
		this.pc1 = new pageControl(this,{bound:[20,20,900,410], childPage:["Data Biaya Gaji","Pesan Kesalahan","Eval Outlook"]});				
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.childPage[0].width-5,this.pc1.childPage[0].height-40],colCount:19,tag:0,		        				
				colTitle:["Kode Lokasi","NIK","Nama","Status","Loker","Jabatan", "GADAS","TUPOS","TUJ MAHAL","FASTEL","THT","ASKES","INS","THR","CUTI","BAS","UJPY","ONCALL","OPTIMAL"],
				colWidth:[[18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80]],
				colFormat:[[6,7,8,9,10,11,12,13,14,15,16,17,18],
				           [cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,
						   cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],							
						   readOnly:true, defaultRow:1});		
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
		
		var tahun = parseFloat(this.dp_d1.year) + 1;
		this.e_tahun.setText(tahun);
		this.nik_user = this.app._nikUser;		
	}
};
window.app_saku2_transaksi_anggaran_fLoadDokter2014.extend(window.portalui_childForm);
window.app_saku2_transaksi_anggaran_fLoadDokter2014.implement({		
	doAfterUpload: function(sender, result, data){		
	    try{   						
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
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];		                                                 																																																																																																																																																																																		
			this.sg1.appendData([line.kode_lokasi,line.nik,line.nama,line.status,line.loker,line.jabatan,floatToNilai(line.gadas),floatToNilai(line.tupos),floatToNilai(line.tumahal),floatToNilai(line.fastel),floatToNilai(line.tht),floatToNilai(line.askes),floatToNilai(line.ins),floatToNilai(line.thr),floatToNilai(line.cuti),floatToNilai(line.bas),floatToNilai(line.ujpy),floatToNilai(line.oncall),floatToNilai(line.optimal)]);
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);				
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_dokter_m','no_gaji',this.app._lokasi+"-HDOK"+this.e_tahun.getText()+".",'000'));
				}
				break;
			case "simpan" :											
					if (this.prog != "0") {
						system.alert(this,"Transaksi tidak valid.","Transaksi SDM telah di Close.");
						return false;
					}									
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{	
							this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_dokter_m','no_gaji',this.app._lokasi+"-HDOK"+this.e_tahun.getText()+".",'000'));
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();																																											
							
							sql.add("delete from agg_dokter where tahun = '"+this.e_tahun.getText()+"'");
							sql.add("delete from agg_dokter_m where tahun = '"+this.e_tahun.getText()+"'");							
							sql.add("delete from agg_dokter_nilai where tahun = '"+this.e_tahun.getText()+"'");
							sql.add("delete from agg_d where modul = 'BTPKK' and tahun = '"+this.e_tahun.getText()+"'");
							
							sql.add("insert into agg_dokter_m(no_gaji,kode_lokasi,tahun,nik_user) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_tahun.getText()+"','"+this.app._userLog+"')");							
							
							var idx =0;
							for (var i=0; i < this.dataUpload.rows.length;i++){
								line = this.dataUpload.rows[i];																																									
								sql.add("insert into agg_dokter(kode_dokter,kode_lokasi,tahun,nama,keterangan,kode_band,kode_pp,volume,status) values "+
										"('"+line.nik+"','"+line.kode_lokasi+"','"+this.e_tahun.getText()+"','"+line.nama+"','"+line.jabatan.substr(0,20)+"','-','"+line.kode_lokasi+"1000',0,'N')");
								
								for (var j=1; j <= 12; j++){
									idx++;																		
									sql.add("insert into agg_dokter_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','GADAS',"+line.gadas+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_dokter_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','TUPOS',"+line.tupos+",0,'"+(j<10?"0":"")+j+"','-','-','-')");
									sql.add("insert into agg_dokter_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','TUMAHAL',"+line.tumahal+",0,'"+(j<10?"0":"")+j+"','-','-','-')");
									sql.add("insert into agg_dokter_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','FASTEL',"+line.fastel+",0,'"+(j<10?"0":"")+j+"','-','-','-')");
									sql.add("insert into agg_dokter_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','THT',"+line.tht+",0,'"+(j<10?"0":"")+j+"','-','-','-')");
									sql.add("insert into agg_dokter_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','ASKES',"+line.askes+",0,'"+(j<10?"0":"")+j+"','-','-','-')");
									sql.add("insert into agg_dokter_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','ONCALL',"+line.oncall+",0,'"+(j<10?"0":"")+j+"','-','-','-')");
									sql.add("insert into agg_dokter_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','OPTIMAL',"+line.optimal+",0,'"+(j<10?"0":"")+j+"','-','-','-')");
									
								}								
								sql.add("insert into agg_dokter_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','INS',"+line.ins+",0,'01','-','-','-')");
								sql.add("insert into agg_dokter_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','INS',"+line.ins+",0,'04','-','-','-')");
								sql.add("insert into agg_dokter_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','INS',"+line.ins+",0,'07','-','-','-')");
								sql.add("insert into agg_dokter_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','INS',"+line.ins+",0,'10','-','-','-')");
								
								sql.add("insert into agg_dokter_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','THR',"+line.thr+",0,'07','-','-','-')");								
								sql.add("insert into agg_dokter_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','CUTI',"+line.cuti+",0,'02','-','-','-')");
								sql.add("insert into agg_dokter_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','BAS',"+line.bas+",0,'05','-','-','-')");							
								sql.add("insert into agg_dokter_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','UJPY',"+line.ujpy+",0,'07','-','-','-')");								
							}							
							
							sql.add("update a set a.bagi=b.bagi,a.kode_akun=b.dokter,"+
							        "a.kode_pp=(case when substring(b.kode_pp_dokter,1,2)='XX' then c.kode_lokasi+'1000' else b.kode_pp_dokter end),"+
								    "a.kode_drk=b.drk_dokter "+
							        "from agg_dokter_nilai a inner join agg_dokter_param b on a.kode_param=b.kode_param "+
									"                        inner join agg_dokter c on a.nik=c.kode_dokter and c.tahun='"+this.e_tahun.getText()+"' "+
									"where a.no_gaji ='"+this.e_nb.getText()+"' ");
							
							sql.add("update agg_dokter_nilai set nilai=(case when bagi<>0 then round(nilai/bagi,0) else 0 end) where no_gaji ='"+this.e_nb.getText()+"' ");
							
							sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) "+
									"select substring(a.kode_pp,1,2),a.nik,a.kode_drk,a.kode_param,a.kode_akun,a.kode_pp,a.tahun+a.bulan,a.bulan,1,1,a.nilai,a.tahun,a.no_gaji,'BTPKK','0','E',b.nama "+
									"from agg_dokter_nilai a inner join masakun b on a.kode_akun=b.kode_akun and b.kode_lokasi='"+this.app._lokasi+"' "+
									"where a.no_gaji='"+this.e_nb.getText()+"' and a.nilai <>0");							
												
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_dokter_m','no_gaji',this.app._lokasi+"-HDOK"+this.e_tahun.getText()+".",'000'));
		}		
	},			
	doChange: function(sender){	
		if (sender == this.e_tahun && this.e_tahun.getText()!= "") {						
			var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'SDM' and tahun = '"+this.e_tahun.getText()+"'",true);
			if (typeof data == "object"){
				this.prog = data.rs.rows[0].progress;
			}			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_dokter_m','no_gaji',this.app._lokasi+"-HDOK"+this.e_tahun.getText()+".",'000'));
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){						
						this.app._mainForm.pesan(2,"Transaksi Sukses tersimpan");
						this.app._mainForm.bClear.click();              						
					}else {
						system.info(this, result,"");											
						setTipeButton(tbSimpan);
					}
				break;
			}
		}		
	}	
});
