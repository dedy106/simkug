window.app_saku3_transaksi_ppbs_yakes_fLoadGaji2013 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_yakes_fLoadGaji2013.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_ppbs_yakes_fLoadGaji2013";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Gaji Format2013: Load dan Hitung", 0);	
		
		this.maximize();		
		uses("portalui_saiMemo;portalui_saiCBB;portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,maxLength:4,tipeText:ttAngka,change:[this,"doChange"]});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],visible:false}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Gaji", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.bUpload = new portalui_uploader(this,{bound:[840,12,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
				
		this.pc1 = new pageControl(this,{bound:[20,20,900,410], childPage:["Data Biaya Gaji","Pesan Kesalahan","Eval Outlook"]});				
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.childPage[0].width-5,this.pc1.childPage[0].height-40],colCount:53,tag:0,		        
				colTitle:["NIK","GADAS","TUDAS","TUPOS","TUNKES","FASTEL","RLJ","RDKI","RHS","JAM84","JAM57","JAMTPBW","OBAT","ASKEDIR","BBM","BBP","PAKSER","THR","GCU","CUTAH","TCUTI","FASKES","BAS","DPLK","INS","UJPY","PPH", "LEMBUR","IBO","PLTH",    "BPFKJ","TTRANS","MFEE","BPP","BFPT","PAKOR","PENS","UPP"    ,"PDKH","KRKT","TRORG",    
				          "THPDOK","BPJSDOK","OCDOK","PAKSERDOK","IBODOK","PAKORDOK","PLTHDOK","KRKTDOK","THRDOK","GCUDOK","CUTAHDOK","BASDOK"],								
				colWidth:[[52,51,50,49,48,47,46,45,44,43,42,41,  40,39,38, 37,36,35,34,33,32,31,30,  29,28,27, 26,25,24,23,22,21,20,19,18,17, 16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,80,80,80, 80,80,80, 80,80,80,80,80,80,80,80,80,80,  80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80  ,80,80,80  ,80,80,80,80,80,80,80,80,80,80,80,80]],
				colFormat:[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40, 41,42,43,44,45,46,47,48,49,50,51,52],
				           [cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,
						    cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,
							cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,
							cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai ,cfNilai,cfNilai,cfNilai,
							cfNilai,cfNilai,cfNilai, cfNilai,cfNilai,cfNilai, cfNilai,cfNilai,cfNilai, cfNilai,cfNilai,cfNilai]],							
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
window.app_saku3_transaksi_ppbs_yakes_fLoadGaji2013.extend(window.portalui_childForm);
window.app_saku3_transaksi_ppbs_yakes_fLoadGaji2013.implement({		
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
			this.sg1.appendData([line.nik,floatToNilai(line.gadas),floatToNilai(line.tudas),floatToNilai(line.tupos),floatToNilai(line.tunkes),floatToNilai(line.fastel),floatToNilai(line.rlj),floatToNilai(line.rdki),floatToNilai(line.rhs),floatToNilai(line.jam84),floatToNilai(line.jam57),floatToNilai(line.jamtpbw),floatToNilai(line.obat),floatToNilai(line.askedir),floatToNilai(line.bbm),floatToNilai(line.bbp),floatToNilai(line.pakser),floatToNilai(line.thr),floatToNilai(line.gcu),floatToNilai(line.cutah),floatToNilai(line.tcuti),floatToNilai(line.faskes),floatToNilai(line.bas),floatToNilai(line.dplk),floatToNilai(line.ins),floatToNilai(line.ujpy),floatToNilai(line.pph),floatToNilai(line.lmbr),floatToNilai(line.ibo),floatToNilai(line.plth),floatToNilai(line.bpfkj),floatToNilai(line.ttrans),floatToNilai(line.mfee),floatToNilai(line.bpp),floatToNilai(line.bfpt),floatToNilai(line.pakor),floatToNilai(line.pens),floatToNilai(line.upp)  ,floatToNilai(line.pdkh),floatToNilai(line.krkt),floatToNilai(line.trorg),    
			                    floatToNilai(line.thpdok),floatToNilai(line.bpjsdok),floatToNilai(line.ocdok),floatToNilai(line.pakserdok),floatToNilai(line.ibodok),floatToNilai(line.pakordok),floatToNilai(line.plthdok),floatToNilai(line.krktdok),floatToNilai(line.thrdok),floatToNilai(line.gcudok),floatToNilai(line.cutahdok),floatToNilai(line.basdok)]);
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_gaji_m','no_gaji',this.app._lokasi+"-GAJI"+this.e_tahun.getText()+".",'000'));
				}
				break;
			case "simpan" :											
					if (this.prog != "0") {
						system.alert(this,"Transaksi tidak valid.","Transaksi SDM telah di Close.");
						return false;
					}									
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{	
							this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_gaji_m','no_gaji',this.app._lokasi+"-GAJI"+this.e_tahun.getText()+".",'000'));
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();																																											
							
							sql.add("delete from agg_gaji_m where tahun = '"+this.e_tahun.getText()+"'");
							sql.add("delete from agg_gaji_nilai where tahun = '"+this.e_tahun.getText()+"'");
							sql.add("delete from agg_d where modul = 'BGAJI' and tahun = '"+this.e_tahun.getText()+"'");
							
							sql.add("insert into agg_gaji_m(no_gaji,kode_lokasi,tahun,nik_user) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_tahun.getText()+"','"+this.app._userLog+"')");							
							
							var idx =0;
							for (var i=0; i < this.dataUpload.rows.length;i++){
								line = this.dataUpload.rows[i];																																		
								for (var j=1; j <= 12; j++){
									idx++;																		
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','ASKEDIR',"+line.askedir+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','BBM',"+line.bbm+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','BPFKJ',"+line.bpfkj+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','DPLK',"+line.dplk+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','JAM57',"+line.jam57+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','JAM84',"+line.jam84+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','JAMTPBW',"+line.jamtpbw+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','KRKT',"+line.krkt+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','LMBR',"+line.lmbr+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','MFEE',"+line.mfee+",0,'"+(j<10?"0":"")+j+"','-','-','-')");																		
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','RDKI',"+line.rdki+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','RHS',"+line.rhs+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','RLJ',"+line.rlj+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','TRORG',"+line.trorg+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','TTRANS',"+line.ttrans+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','TUDAS',"+line.tudas+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','TUNKES',"+line.tunkes+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','TUPOS',"+line.tupos+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','PDKH',"+line.pdkh+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','FASTEL',"+line.fastel+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','GADAS',"+line.gadas+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','BASDOK',"+line.basdok+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','BPJSDOK',"+line.bpjsdok+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','THPDOK',"+line.thpdok+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','OCDOK',"+line.ocdok+",0,'"+(j<10?"0":"")+j+"','-','-','-')");									
									
								}								
								//FASKES
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','FASKES',"+line.faskes+",0,'02','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','FASKES',"+line.faskes+",0,'05','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','FASKES',"+line.faskes+",0,'08','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','FASKES',"+line.faskes+",0,'11','-','-','-')");
								//OBAT
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','OBAT',"+line.obat+",0,'02','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','OBAT',"+line.obat+",0,'05','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','OBAT',"+line.obat+",0,'08','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','OBAT',"+line.obat+",0,'11','-','-','-')");
								//PENS
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','PENS',"+line.pens+",0,'02','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','PENS',"+line.pens+",0,'05','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','PENS',"+line.pens+",0,'08','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','PENS',"+line.pens+",0,'11','-','-','-')");
								//PLTH
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','PLTH',"+line.plth+",0,'02','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','PLTH',"+line.plth+",0,'05','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','PLTH',"+line.plth+",0,'08','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','PLTH',"+line.plth+",0,'11','-','-','-')");
								//INS
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','INS',"+line.ins+",0,'02','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','INS',"+line.ins+",0,'05','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','INS',"+line.ins+",0,'08','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','INS',"+line.ins+",0,'11','-','-','-')");
								//BBP
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','BBP',"+line.bbp+",0,'02','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','BBP',"+line.bbp+",0,'05','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','BBP',"+line.bbp+",0,'08','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','BBP',"+line.bbp+",0,'11','-','-','-')");
									
								//PPH
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','PPH',"+line.pph+",0,'02','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','PPH',"+line.pph+",0,'05','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','PPH',"+line.pph+",0,'08','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','PPH',"+line.pph+",0,'11','-','-','-')");
								
								//PLTHDOK
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','PLTHDOK',"+line.plthdok+",0,'02','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','PLTHDOK',"+line.plthdok+",0,'05','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','PLTHDOK',"+line.plthdok+",0,'08','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','PLTHDOK',"+line.plthdok+",0,'11','-','-','-')");
								
								//KRKTDOK
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','KRKTDOK',"+line.krktdok+",0,'02','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','KRKTDOK',"+line.krktdok+",0,'05','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','KRKTDOK',"+line.krktdok+",0,'08','-','-','-')");
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','KRKTDOK',"+line.krktdok+",0,'11','-','-','-')");
								
								
									
								
								//CUTAH
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','CUTAH',"+line.cutah+",0,'02','-','-','-')");								
								//TCUTI
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','TCUTI',"+line.tcuti+",0,'02','-','-','-')");								
								//PAKSER
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','PAKSER',"+line.pakser+",0,'04','-','-','-')");								
								//PAKOR
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','PAKOR',"+line.pakor+",0,'06','-','-','-')");								
								//BPP
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','BPP',"+line.bpp+",0,'06','-','-','-')");								
								//BFPT
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','BFPT',"+line.bfpt+",0,'06','-','-','-')");								
								//BAS
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','BAS',"+line.bas+",0,'06','-','-','-')");								
								//UJPY
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','UJPY',"+line.ujpy+",0,'06','-','-','-')");								
								//UPP
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','UPP',"+line.upp+",0,'06','-','-','-')");								
								//THR
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','THR',"+line.thr+",0,'07','-','-','-')");								
								//IBO
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','IBO',"+line.ibo+",0,'08','-','-','-')");								
								//GCU
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','GCU',"+line.gcu+",0,'10','-','-','-')");								
								
								
								
								//PAKORDOK
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','PAKORDOK',"+line.pakordok+",0,'06','-','-','-')");								
								//PAKSERDOK
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','PAKSERDOK',"+line.pakserdok+",0,'04','-','-','-')");								
								//THRDOK
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','THRDOK',"+line.thrdok+",0,'07','-','-','-')");								
								//CUTAHDOK
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','CUTAHDOK',"+line.cutahdok+",0,'02','-','-','-')");								
								//GCUDOK
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','GCUDOK',"+line.gcudok+",0,'10','-','-','-')");								
								//IBODOK
								sql.add("insert into agg_gaji_nilai(no_gaji,nik,tahun,kode_param,nilai,bagi,bulan,kode_akun,kode_pp,kode_drk) values ('"+this.e_nb.getText()+"','"+line.nik+"','"+this.e_tahun.getText()+"','IBODOK',"+line.ibodok+",0,'08','-','-','-')");								
								
							}							
							
							sql.add("update a set a.bagi=b.bagi,a.kode_akun=(case when c.status_org in ('8','1') then b.organik else b.tpbw end),"+
							        "a.kode_pp=(case when c.status_org in ('8','1') then (case when substring(b.kode_pp_org,1,2)='XX' then c.kode_lokasi+'3000' else b.kode_pp_org end)  else (case when substring(b.kode_pp_tpbw,1,2)='XX' then c.kode_lokasi+'3000' else b.kode_pp_tpbw end) end),"+
								    "a.kode_drk=(case when c.status_org in ('8','1') then b.drk_org else b.drk_tpbw end) "+
							        "from agg_gaji_nilai a inner join agg_gaji_param b on a.kode_param=b.kode_param "+
									"                      inner join agg_karyawan c on a.nik=c.nik and c.tahun='"+this.e_tahun.getText()+"' "+
									"where a.no_gaji ='"+this.e_nb.getText()+"' ");
							
							sql.add("update agg_gaji_nilai set nilai=(case when bagi<>0 then round(nilai/bagi,0) else 0 end) where no_gaji ='"+this.e_nb.getText()+"' ");
							sql.add("update agg_gaji_nilai set kode_pp='993100' where no_gaji ='"+this.e_nb.getText()+"' and kode_pp = '993000'");
							
							
							sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) "+
									"select substring(a.kode_pp,1,2),a.nik,a.kode_drk,a.kode_param,a.kode_akun,a.kode_pp,a.tahun+a.bulan,a.bulan,1,1,a.nilai,a.tahun,a.no_gaji,'BGAJI','0','E',b.nama "+
									"from agg_gaji_nilai a inner join masakun b on a.kode_akun=b.kode_akun and b.kode_lokasi='"+this.app._lokasi+"' "+
									"where a.no_gaji='"+this.e_nb.getText()+"' and a.nilai <>0");							
							
							
							
							//BBM  ke adm lainnya 415 utk nik pengurus
							//UJPY ke adm lainnya 415 utk nik pengurus, pembina pengawas							
							//sql.add("update agg_d set kode_akun='4152020009' where modul='BGAJI' and no_bukti='"+this.e_nb.getText()+"' and kode_rka='BBM' and kode_pk in ('630658','580798','612271','622579','710365')");
							//sql.add("update agg_d set kode_akun='4152020009' where modul='BGAJI' and no_bukti='"+this.e_nb.getText()+"' and kode_rka='UJPY' and kode_pk in ('630658','580798','612271','622579','710365')");
														
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_gaji_m','no_gaji',this.app._lokasi+"-GAJI"+this.e_tahun.getText()+".",'000'));			
		}		
	},			
	doChange: function(sender){	
		if (sender == this.e_tahun && this.e_tahun.getText()!= "") {						
			var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'SDM' and tahun = '"+this.e_tahun.getText()+"'",true);
			if (typeof data == "object"){
				this.prog = data.rs.rows[0].progress;
			}			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_gaji_m','no_gaji',this.app._lokasi+"-GAJI"+this.e_tahun.getText()+".",'000'));
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
