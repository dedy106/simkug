window.app_saku2_transaksi_kopeg_proyek_fProyek = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_proyek_fProyek.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_proyek_fProyek";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Proyek: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;saiMemo");
		uses("saiGrid",true);
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,470], childPage:["Data Project","Detail Project","Filter Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:13,tag:9,
		            colTitle:["ID Project","No SPK/PKS","Tahun","PP","Customer","Nama Project","Tgl Mulai","Tgl Selesai","Nilai Project","PPN","% OR","Max Beban/OR","PPH"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,50,100,100,70,70,300,200,150,50,150,100]],
					readOnly:true,colFormat:[[8,9,10,11,12],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.e_tahun = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,150,20],caption:"Tahun",tag:2,readOnly:true,change:[this,"doChange"]});
		//this.dp_d = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,13,100,18]}); 		
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"ID Proyek",maxLength:30,readOnly:true});
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[320,12,200,20],caption:"Status Aktif",items:["1.AKTIF","2.AMANDEMEN","0.NON"], readOnly:true,tag:2});		
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,12,20,20],hint:"Data Baru",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]}); 
		this.e_dok = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"No SPK/PKS", maxLength:100,tag:1});				
		this.e_ket = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,500,20],caption:"Nama Proyek", maxLength:150,tag:1});				
		this.cb_pp = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,20,200,20],caption:"PP/Unit",multiSelection:false,tag:1});
		this.cb_cust = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Mitra",multiSelection:false,tag:1});
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Jenis",items:["PROYEK","PELATIHAN"], readOnly:true,tag:2});		
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,100,18]}); 
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[320,11,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[1],{bound:[420,11,100,18]}); 						
		this.e_pph = new saiLabelEdit(this.pc1.childPage[1],{bound:[780,11,200,20],caption:"Nilai PPh", tag:1, tipeText:ttNilai, text:"0",readOnly:true});				
		this.e_por = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"% OR", tag:2, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[780,14,200,20],caption:"Nilai Proyek", tag:1, tipeText:ttNilai, text:"0",readOnly:true,change:[this,"doChange"]});				
		this.e_nilaior = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Maks Beban / OR", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[1],{bound:[780,15,200,20],caption:"Nilai PPN", tag:1,  tipeText:ttNilai, text:"0",readOnly:true});		
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[10,200,980,220], childPage:["Deskripsi Proyek","Termin Tagihan","PIC","Dokumen","History Amandemen"]});						
		this.e_uraian = new saiMemo(this.pc2.childPage[0],{bound:[0,0,979,219],labelWidth:0,caption:"Deskripsi Proyek",tag:9});
		this.sg = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,180],colCount:9,tag:0,
		            colTitle:["Jth Tempo","Uraian Termin","Harga Sat","Vol","Total","PPN","Status","Flag Akru","PPh"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,60,80,100,100,60,80,320,100]],										
					colFormat:[[2,3,4,5,8],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[4,6],[0,1,2,3,5,7,8]],					
					buttonStyle:[[0,6],[bsDate,bsAuto]], picklist:[[6],[new portalui_arrayMap({items:["CASH","NONCASH"]})]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-5,25],buttonStyle:2,grid:this.sg});		

		this.sg2 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,180],colCount:3,tag:0,
		            colTitle:["PIC","Nama","Status"],
					colWidth:[[2,1,0],[200,400,100]],															
					columnReadOnly:[true,[1,2],[0]],					
					buttonStyle:[[0],[bsEllips]],
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-5,25],buttonStyle:2,grid:this.sg2});		
		
		this.sgUpld = new saiGrid(this.pc2.childPage[3],{bound:[1,5,this.pc2.width-5,180],colCount:4,
					    colTitle:["Kd Jenis","Jenis Dokumen","Dokumen","Upload"],
					    colWidth:[[3,2,1,0],[80,480,200,80]], 
						colFormat:[[3],[cfUpload]], buttonStyle:[[0],[bsEllips]], 
						ellipsClick:[this,"doEllipsClickUpld"],readOnly:true,change:[this,"doGridChangeUpld"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc2.childPage[3],{bound:[1,this.pc2.height - 25,this.pc2.width-5,25],buttonStyle:1, grid:this.sgUpld});
		
		this.sg3 = new saiGrid(this.pc2.childPage[4],{bound:[1,5,this.pc2.width-5,210],colCount:12,tag:9,
					colTitle:["ID Project","No SPK/PKS","Tahun","PP","Customer","Nama Project","Tgl Mulai","Tgl Selesai","Nilai Project","PPN","% OR","Max Beban/OR"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[100,50,100,100,70,70,300,200,150,50,150,100]],
					readOnly:true,colFormat:[[8,9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai]],
					autoAppend:false,defaultRow:1});		
							
		this.cb_cust2 = new portalui_saiCBBL(this.pc1.childPage[2],{bound:[20,15,200,20],caption:"Customer",multiSelection:false,tag:9});
		this.bCari = new button(this.pc1.childPage[2],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi = '"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);
			this.cb_cust2.setSQL("select kode_cust, nama from cust where kode_lokasi = '"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);
			this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP/Unit",true);		
			var tahun = parseFloat(this.dp_d.year);
			this.e_tahun.setText(tahun);			
			this.e_por.setText("80");			
			this.doLoad();
			
			var sql = new server_util_arrayList();
			sql.add("select kode_pic,nama from pr_pic where kode_lokasi = '"+this.app._lokasi+"'");			
			this.dbLib.getMultiDataProviderA(sql);
			this.c_status.setText("1.AKTIF");
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";				
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_proyek_fProyek.extend(window.portalui_childForm);
window.app_saku2_transaksi_kopeg_proyek_fProyek.implement({	
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					this.idx = 0;
					var data = this.dbLib.getDataProvider("select count(no_proyek) as nu from pr_proyek_h where no_proyek='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){							
							this.idx = parseFloat(line.nu) + 1;							
						}
					}
					
					if (this.stsSimpan == "1") {
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pr_proyek_m","no_proyek",this.app._lokasi+"-PRO"+this.e_tahun.getText()+".","000"));
						this.flagAktif = "1";
					}
					else {												
						sql.add("delete from pr_proyek_m where no_proyek='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pr_proyek_termin where no_proyek='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pr_proyek_pic where no_proyek='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pr_proyek_dok where no_proyek='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						for (var i in this.listFiles.objList) {
							var ketemu = false;
							for (var j=0;j < this.sgUpld.getRowCount();j++){
								ketemu = i == this.sgUpld.cells(2,j);
								if (ketemu) break;
							}
							if (!ketemu) this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
						}
						this.flagAktif = this.c_status.getText().substr(0,1);
						if (this.flagAktif != "2") {
							sql.add("delete from pr_proyek_h where id="+this.idLama+" and no_proyek='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							sql.add("delete from pr_proyek_termin_h where id="+this.idLama+" and no_proyek='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
					}											
					sql.add("insert into pr_proyek_m(no_proyek,kode_lokasi,nik_user,tgl_input,kode_cust,tahun,no_dokumen,tgl_mulai,tgl_selesai,nilai,nilai_ppn,persen_or,nilai_or,progress,kode_pp,keterangan,uraian,flag_aktif,id,jenis,pph) values "+
						   "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.cb_cust.getText()+"','"+this.e_tahun.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_por.getText())+","+nilaiToFloat(this.e_nilaior.getText())+",'1','"+this.cb_pp.getText()+"','"+this.e_ket.getText()+"','"+this.e_uraian.getText()+"','"+this.flagAktif+"',"+this.idx+",'"+this.c_jenis.getText()+"',"+nilaiToFloat(this.e_pph.getText())+")"); 			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								var j = i+1;
								sql.add("insert into pr_proyek_termin(no_proyek,kode_lokasi,nu,keterangan,nilai,nilai_ppn,no_tagihan,no_kas,due_date,harga,vol,id,status,pph) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+j+",'"+this.sg.cells(1,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+",'-','-','"+this.sg.getCellDateValue(0,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+","+nilaiToFloat(this.sg.cells(3,i))+","+this.idx+",'"+this.sg.cells(6,i)+"',"+nilaiToFloat(this.sg.cells(8,i))+")");
							}
						}
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								var j = i+1;
								sql.add("insert into pr_proyek_pic(no_proyek,kode_lokasi,nu,kode_pic,status) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+j+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"')");
							}
						}
					}					
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							ix++;
							sql.add("insert into pr_proyek_dok(no_proyek,no_gambar,nu,kode_jenis,kode_lokasi)values('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"')");								
						}	
					}					
					sql.add("insert into pr_proyek_h (no_proyek,kode_lokasi,nik_user,tgl_input,kode_cust,tahun,no_dokumen,tgl_mulai,tgl_selesai,nilai,nilai_ppn,persen_or,nilai_or,progress,kode_pp,keterangan,uraian,flag_aktif,id,jenis,pph) "+
					        "select no_proyek,kode_lokasi,nik_user,tgl_input,kode_cust,tahun,no_dokumen,tgl_mulai,tgl_selesai,nilai,nilai_ppn,persen_or,nilai_or,progress,kode_pp,keterangan,uraian,flag_aktif,id,jenis,pph "+
							"from pr_proyek_m where no_proyek='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into pr_proyek_termin_h (no_proyek,kode_lokasi,nu,keterangan,nilai,nilai_ppn,no_tagihan,no_kas,due_date,harga,vol,id,status,pph) "+
					        "select no_proyek,kode_lokasi,nu,keterangan,nilai,nilai_ppn,no_tagihan,no_kas,due_date,harga,vol,id,status,pph "+
							"from pr_proyek_termin where no_proyek='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					this.dbLib.execArraySQL(sql);
					setTipeButton(tbAllFalse);
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);							
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :	
				this.sg.validasi();
				this.stsSimpan = "1";
			    this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;				
			case "ubah" :	
				this.stsSimpan = "2";
			    this.simpan();				
				break;
			/*
			case "hapus" :	
				this.stsSimpan = "3";
			    uses("server_util_arrayList");
				var sql = new server_util_arrayList();								
				sql.add("delete from pr_proyek_m where no_proyek='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from pr_proyek_termin where no_proyek='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;
			*/
		}
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pr_proyek_m","no_proyek",this.app._lokasi+"-PRO"+this.e_tahun.getText()+".","000"));
		this.e_dok.setFocus();
		setTipeButton(tbSimpan);		
		
		this.standarLib.clearByTag(this, new Array("1"),undefined);							
		this.sg.clear(1);
		this.sg2.clear(1);
		this.sg3.clear(1);
		this.sgUpld.clear(1);
		this.e_uraian.setText("");
		this.c_status.setText("1.AKTIF");
	},	
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbah);				
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.e_nb.setText(this.sg1.cells(0,row));					
				this.e_dok.setText(this.sg1.cells(1,row));	
				this.e_ket.setText(this.sg1.cells(5,row));				
				var strSQL = "select kode_cust,kode_pp,uraian,flag_aktif,id,jenis from pr_proyek_m where no_proyek='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.c_jenis.setText(line.jenis);
						this.kode_cust = line.kode_cust;
						this.kode_pp = line.kode_pp;								
						this.e_uraian.setText(line.uraian.replace(/\<br\>/gi,"\r\n"));
						this.idLama = line.id;
						if (line.flag_aktif == "1") this.c_status.setText("1.AKTIF"); else this.c_status.setText("0.NON"); 						
					}
				}											
				this.doLoadH();
				this.cb_pp.setText(this.kode_pp);
				this.cb_cust.setText(this.kode_cust);
				this.dp_d1.setText(this.sg1.cells(6,row));
				this.dp_d2.setText(this.sg1.cells(7,row));
				this.e_por.setText(this.sg1.cells(10,row));
				this.e_nilai.setText(this.sg1.cells(8,row));
				this.e_nilaior.setText(this.sg1.cells(11,row));
				this.e_ppn.setText(this.sg1.cells(9,row));				
								
				var data = this.dbLib.getDataProvider("select a.keterangan,a.harga,a.vol,a.nilai,a.nilai_ppn,convert(varchar,a.due_date,103) as due_date, a.status, case when b.nu is null then '-' else 'AKRU' end  as flag_akru,a.pph "+
				           "from pr_proyek_termin a left join pr_piutang_d b on a.no_proyek=b.no_proyek and a.kode_lokasi=b.kode_lokasi and a.nu=b.nu "+
						   "where a.no_proyek='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg.appendData([line.due_date,line.keterangan,floatToNilai(line.harga),floatToNilai(line.vol),floatToNilai(line.nilai),floatToNilai(line.nilai_ppn),line.status,line.flag_akru.toUpperCase(),floatToNilai(line.pph)]);
					}
				} else this.sg.clear(1);
				this.sg.validasi();
				
				var data = this.dbLib.getDataProvider("select a.kode_pic,b.nama,a.status from pr_proyek_pic a inner join pr_pic b on a.kode_pic=b.kode_pic and a.kode_lokasi=b.kode_lokasi "+
				                                      "where a.no_proyek='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg2.appendData([line.kode_pic,line.nama,line.status]);
					}
				} else this.sg2.clear(1);
				this.sg2.validasi();
								
				this.sgUpld.clear();
				this.deleteFiles = [];
				this.listFiles = new arrayMap();			
				var data = this.dbLib.getDataProvider("select b.kode_jenis,b.nama,a.no_gambar from pr_proyek_dok a inner join pr_dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
						   "where a.no_proyek = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgUpld.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.listFiles.set(line.no_gambar,line.no_gambar); 
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar}]);
					}
				} else this.sgUpld.clear(1);										
			}
		} catch(e) {alert(e);}
	},
	doChange:function(sender){		
		if ((sender == this.e_por || sender == this.e_nilai)  && this.e_por.getText()!="" && this.e_nilai.getText()!="") {
			this.e_nilaior.setText(floatToNilai(Math.round(nilaiToFloat(this.e_nilai.getText()) * nilaiToFloat(this.e_por.getText()) / 100)));	
		}		
	},
	doChangeCell: function(sender, col, row){
		if ((col == 2 ||  col == 3) && this.sg.cells(2,row) != "" && this.sg.cells(3,row) != "") {
			this.sg.cells(4,row,floatToNilai(Math.round(nilaiToFloat(this.sg.cells(2,row)) * nilaiToFloat(this.sg.cells(3,row)))));			
			this.sg.cells(5,row,floatToNilai(Math.round(nilaiToFloat(this.sg.cells(4,row)) * 10 / 100)));
		}
		if ((col == 2 || col == 3 || col == 5) && this.sg.cells(2,row) != "" && this.sg.cells(3,row) != "" && this.sg.cells(5,row) != "") this.doNilaiChange();												
	},
	doNilaiChange: function(){
		try{
			this.nilai = this.ppn = pph = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i)){					
					if (this.sg.cells(4,i)!="") this.nilai += nilaiToFloat(this.sg.cells(4,i));
					if (this.sg.cells(5,i)!="") this.ppn += nilaiToFloat(this.sg.cells(5,i));
					if (this.sg.cells(8,i)!="") this.pph += nilaiToFloat(this.sg.cells(8,i));
				}
			}
			this.e_nilai.setText(floatToNilai(this.nilai));			
			this.e_ppn.setText(floatToNilai(this.ppn));	
			this.e_pph.setText(floatToNilai(this.pph));				
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doSelectDate: function(sender, y,m,d){
		this.e_tahun.setText(y);
		this.doClick();
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){														
							if (this.stsSimpan != "3") {
								this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ptg='"+this.e_nb.getText()+"' ";							
								this.filter = this.filter2;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc1.hide();							
							}
							else {								
								system.info(this,"Transaksi telah sukses tereksekusi","");							
								this.clearLayar();
							}
							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";
						}else system.info(this,result,"");
	    			break;										
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataPIC = new portalui_arrayMap();
							if (result.result[0]){
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataPIC.set(line.kode_pic, line.nama);
								}
							}														
						}else throw result;
					break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);							
			this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sgUpld.clear(1);
			this.e_uraian.setText("");
			this.doLoad();
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.c_status.setText("1.AKTIF");
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},	
	doLoad:function(sender){						
		var strSQL = "select a.no_proyek,a.kode_cust+' - '+b.nama as cust,a.tahun,a.no_dokumen,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.nilai,a.nilai_ppn,a.persen_or,a.nilai_or,a.kode_pp+' - '+c.nama as pp,a.keterangan,a.pph "+
		             "from pr_proyek_m a inner join cust b on a.kode_cust =b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
					 "                   inner join pp c on a.kode_pp =c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
					 "where a.flag_aktif in ('1','2') and a.kode_lokasi='"+this.app._lokasi+"' and a.progress='1' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},
	doLoadH:function(sender){						
		var strSQL = "select a.no_proyek,a.kode_cust+' - '+b.nama as cust,a.tahun,a.no_dokumen,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.nilai,a.nilai_ppn,a.persen_or,a.nilai_or,a.kode_pp+' - '+c.nama as pp,a.keterangan,a.pph "+
		             "from pr_proyek_h a inner join cust b on a.kode_cust =b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
					 "                   inner join pp c on a.kode_pp =c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_proyek='"+this.e_nb.getText()+"' and a.id <> "+this.idLama+" order by a.id desc";				
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJUH = data;
			for (var i=0;i<this.dataJUH.rs.rows.length;i++){
				line = this.dataJUH.rs.rows[i];																	
				this.sg3.appendData([line.no_proyek,line.no_dokumen,line.tahun,line.pp,line.cust,line.keterangan,line.tgl_mulai,line.tgl_selesai,floatToNilai(line.nilai),floatToNilai(line.nilai_ppn),floatToNilai(line.persen_or),floatToNilai(line.nilai_or),floatToNilai(line.pph)]); 
			}
		} else this.sg3.clear(1);			
	},	
	doCari:function(sender){						
		var filter = " and a.kode_cust='"+this.cb_cust2.getText()+"' ";		
		var strSQL = "select a.no_proyek,a.kode_cust+' - '+b.nama as cust,a.tahun,a.no_dokumen,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.nilai,a.nilai_ppn,a.persen_or,a.nilai_or,a.kode_pp+' - '+c.nama as pp,a.keterangan,a.pph "+
		             "from pr_proyek_m a inner join cust b on a.kode_cust =b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
					 "                   inner join pp c on a.kode_pp =c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.progress='1' "+filter;					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);		
	},
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_proyek,line.no_dokumen,line.tahun,line.pp,line.cust,line.keterangan,line.tgl_mulai,line.tgl_selesai,floatToNilai(line.nilai),floatToNilai(line.nilai_ppn),floatToNilai(line.persen_or),floatToNilai(line.nilai_or),floatToNilai(line.pph)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doChangeCell2: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {			
			if (sender.cells(0,row) != "") {				
				var pic = this.dataPIC.get(sender.cells(0,row));				
				if (pic) {
					sender.cells(1,row,pic);
					var strSQL = "select status from pr_pic where kode_pic='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'";			
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){										
							this.sg2.cells(2,row,line.status);							
						}
					}
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode PIC "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.cells(2,row,"");					
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell2");				
	},
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar PIC",sender,undefined, 
						    "select kode_pic,nama from pr_pic where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_pic) from pr_pic where kode_lokasi = '"+this.app._lokasi+"'",
							["kode_pic","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doEllipsClickUpld: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
												  "select kode_jenis,nama   from pr_dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_jenis) from pr_dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}					
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doGridChangeUpld: function(sender, col, row,param1,result, data){
	    try{
        	if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
                this.sgUpld.cells(2,row, data.tmpfile);                
            }			
         }catch(e){
            alert(e+" "+data);
         }
    }
});