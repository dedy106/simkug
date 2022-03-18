window.app_saku3_transaksi_sju16_fKlaim = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sju16_fKlaim.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fKlaim";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Klaim Asuransi", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});		
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal Input", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 						
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,430], childPage:["Filter Cari","Data Polis","Detail Klaim","Dokumen Pendukung","Object Klaim","List Klaim"]});
		this.cb_cust = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Tertanggung",tag:2,multiSelection:false}); 				
		this.bCari = new button(this.pc1.childPage[0],{bound:[120,13,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:13,tag:0,
		            colTitle:["No Polis","Sertifikat","Status Premi","Penanggung","Tertanggung","COB","No Register","Tgl Berlaku Polis","Segmen","Curr","Sum Insured","Premi","COB"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[80,100,100,60,150,150, 100,150,150,150,100,80,200]],
					readOnly:true,colFormat:[[10,11],[cfNilai,cfNilai]],
					colHide:[[12],[true]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});

		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,200,20],caption:"No Klaim",readOnly:true});				
		this.i_gen = new portalui_imageButton(this.pc1.childPage[2],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_berkas = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,450,20],caption:"No Dok/Berkas", maxLength:200});	
		this.e_nopolis = new saiLabelEdit(this.pc1.childPage[2],{bound:[520,12,200,20],caption:"No Register", readOnly:true});	
		this.e_nodok = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,450,20],caption:"No Polis", readOnly:true});		
		this.e_unit = new saiLabelEdit(this.pc1.childPage[2],{bound:[520,13,450,20],caption:"Segmen", readOnly:true});				
		this.e_tglpolis = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,300,20],caption:"Period of Insurance", readOnly:true});		
		this.e_penanggung = new saiLabelEdit(this.pc1.childPage[2],{bound:[520,14,450,20],caption:"Penanggung", readOnly:true});		
		this.e_tipe = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,450,20],caption:"COB", readOnly:true});				
		this.e_tertanggung = new saiLabelEdit(this.pc1.childPage[2],{bound:[520,11,450,20],caption:"Tertanggung", readOnly:true});				
		this.e_curr = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,17,200,20],caption:"Curr", readOnly:true});						
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[2],{bound:[270,17,200,20],caption:"Sum Insured", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		this.e_premi = new saiLabelEdit(this.pc1.childPage[2],{bound:[520,17,200,20],caption:"Nilai Premi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_lokasi = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,450,20],caption:"Lokasi Kejadian", maxLength:200});						
		this.e_status = new saiLabelEdit(this.pc1.childPage[2],{bound:[520,10,200,20],caption:"Status Bayar", tag:1, readOnly:true});						
		this.e_estimasi = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,200,20],caption:"Nilai Estimasi", tag:1,tipeText:ttNilai, text:"0"});								
		this.l_tgl2 = new portalui_label(this.pc1.childPage[2],{bound:[20,19,100,18],caption:"Date Of Loss", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[2],{bound:[120,19,98,18]}); 						
		this.l_tgl3 = new portalui_label(this.pc1.childPage[2],{bound:[270,19,100,18],caption:"Tanggal Diketahui", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[2],{bound:[370,19,98,18]}); 										
		this.cb_oblos = new saiCBBL(this.pc1.childPage[2],{bound:[20,14,220,20],caption:"Object Of Loss", multiSelection:false, maxLength:10, tag:2});
		this.cb_sebab = new saiCBBL(this.pc1.childPage[2],{bound:[20,13,220,20],caption:"Penyebab Kerugian", multiSelection:false, maxLength:10, tag:2});
		this.e_memo = new saiMemo(this.pc1.childPage[2],{bound:[20,20,450,100],caption:"Ket. Kejadian",tag:9});
		
		this.sgUpld = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,
					    colTitle:["Kd Jenis","Jenis Dokumen","Path File","Upload"],
					    colWidth:[[3,2,1,0],[80,280,400,80]], 
						colFormat:[[3],[cfUpload]], 
						ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sg1 = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,				
				colTitle:["Status","Nama","Alamat","No Ref1","No Ref2","No Ref3","Nilai","Deductible","ID"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[50,100,100,130,130,130,250,150,70]],
				readOnly:true,
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["CLAIM","NOCLAIM"]})]],
				colFormat:[[6,7],[cfNilai,cfNilai]],
				dblClick:[this,"doDoubleClick1"],defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[4],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager1"]});

		this.sg3 = new saiGrid(this.pc1.childPage[5],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:14,tag:9,
		            colTitle:["No Polis","Sertifikat","Status Premi","Penanggung","Tertanggung","COB","No Register","Tgl Berlaku Polis","Segmen","Curr","Sum Insured","Premi","No Klaim","COB"],
					colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,100,100,100,60,150,150, 100,150,150,150,100,80,200]],
					colHide:[[13],[true]],
					readOnly:true,colFormat:[[10,11],[cfNilai,cfNilai]],					
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[5],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			this.cb_cust.setSQL("select a.kode_cust, a.nama from sju_cust a "+
							    "inner join karyawan_pp b on a.kode_segmen=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								"where a.kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);
							
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sju16_fKlaim.extend(window.childForm);
window.app_saku3_transaksi_sju16_fKlaim.implement({
	doLoad:function(sender){
		if (this.cb_cust.getText() != "") {			
			var strSQL = "select a.no_dok,a.no_dok2, case when y.no_polis is null then 'UNPAID' else 'PAID' end as sts_bayar,d.kode_vendor +' | '+d.nama as vendor,c.kode_cust +' | '+c.nama as cust,e.kode_tipe+' | '+e.nama as tipe,a.no_polis, "+
						"convert(varchar,a.tgl_mulai,103) +' - ' + convert(varchar,a.tgl_selesai,103) as tgl, a.kode_pp+' | '+f.nama as pp,a.kode_curr,a.total,a.n_premi, e.kode_tipe  "+ 
						"from sju_polis_m a inner join sju_cust c on a.kode_cust = c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
						"                   inner join sju_polis_vendor b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi and b.status = 'LEADER' "+
						"                   inner join sju_vendor d on b.kode_vendor = d.kode_vendor and b.kode_lokasi=d.kode_lokasi "+
						"                   inner join sju_tipe e on a.kode_tipe = e.kode_tipe and a.kode_lokasi=e.kode_lokasi "+
						"                   inner join pp f on a.kode_pp = f.kode_pp and a.kode_lokasi=f.kode_lokasi "+
						"                   inner join sju_polis_termin x on a.no_polis=x.no_polis and a.kode_lokasi=x.kode_lokasi and x.nu=0 "+
						"                   left join sju_polisbayar_d y on x.no_polis=y.no_polis and y.kode_lokasi=x.kode_lokasi and x.nu=y.nu and x.no_bill=y.no_bill "+					 
						"where a.kode_cust='"+this.cb_cust.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and  '"+this.dp_d1.getDateString()+"' between a.tgl_mulai and a.tgl_selesai and a.flag_aktif='1' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);	
			this.doLoad3();
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
		else system.alert(this,"Tertanggung harus di pilih.","");		
	},		
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];		
			this.sg.appendData([line.no_dok,line.no_dok2,line.sts_bayar.toUpperCase(),line.vendor,line.cust,line.tipe,line.no_polis,line.tgl,line.pp,line.kode_curr,floatToNilai(line.total),floatToNilai(line.n_premi),line.kode_tipe]);  
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
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
	simpan: function(){			
		try{		
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();		
					if (this.stsSimpan == 0) {
						sql.add("delete from sju_klaim where no_klaim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");	
						sql.add("delete from sju_klaim_objek where no_klaim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");	
						sql.add("delete from sju_klaim_dok where no_klaim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");	
						for (var i in this.listFiles.objList) {
							var ketemu = false;
							for (var j=0;j < this.sgUpld.getRowCount();j++){
								ketemu = i == this.sgUpld.cells(2,j);
								if (ketemu) break;
							}
							if (!ketemu) this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
						}						
					}
				
					sql.add("insert into sju_klaim (no_klaim,periode,kode_lokasi,tanggal,no_polis,keterangan,nik_user,tgl_input,nilai,progress,no_berkas,tgl_dol,lokasi,sebab,tgl_tahu,kode_obl,status) values "+
							"('"+this.e_nb.getText()+"','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_nopolis.getText()+"','"+this.e_memo.getText()+"','"+this.app._userLog+"',getdate(),"+nilaiToFloat(this.e_estimasi.getText())+",'LA','"+this.e_berkas.getText()+"','"+this.dp_d2.getDateString()+"','"+this.e_lokasi.getText()+"','"+this.cb_sebab.getText()+"','"+this.dp_d3.getDateString()+"','"+this.cb_oblos.getText()+"','0')");
					
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-"){
							ix++;
							sql.add("insert into sju_klaim_dok(no_klaim,path_file,nu,kode_jenis,kode_lokasi)values('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"')");								
						}	
					}	
					
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && this.sg1.cells(0,i)=="CLAIM"){							
							sql.add("insert into sju_klaim_objek(no_klaim,kode_lokasi,no_polis,id,no_ref1) values ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_nopolis.getText()+"',"+this.sg1.cells(8,i)+",'"+this.sg1.cells(3,i)+"')");								
						}	
					}

					setTipeButton(tbAllFalse);					
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
					this.sg3.clear(1); this.sg.clear(1); this.sgUpld.clear(1);										
					this.e_memo.setText("-");
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.stsSimpan = 1;													
					setTipeButton(tbSimpan);
					this.dataJU = {rs:{rows:[]}};
					this.dataJU3 = {rs:{rows:[]}};
				break;
			case "simpan" :		
			case "ubah" :					
				this.preView = "1";	
				var strSQL = "select a.no_polis from sju_polis_m a "+
							 "where a.no_polis='"+this.e_nopolis.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and '"+this.dp_d1.getDateString()+"' between a.tgl_mulai and a.tgl_selesai ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line == undefined){							
						system.alert(this,"Transaksi tidak valid.","Tgl Klaim diluar periode Polis.");
						return false;						
					}
				}
				if (this.e_status.getText() != "PAID") {
					system.alert(this,"Klaim tidak dapat disimpan.","Status Premi belum dilunasi.");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :					
					this.preView = "0";
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from sju_klaim where no_klaim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");	
					sql.add("delete from sju_klaim_objek where no_klaim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");	
					sql.add("delete from sju_klaim_dok where no_klaim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					this.deletedFiles = "";	
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							if (this.deletedFiles != "") this.deletedFiles += ";";
							this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(2,i);
						}
					}
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);				
				break	
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}		
		if (this.stsSimpan == 1) this.doClick();		
	},	
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				if (this.stsSimpan == 0) {			
					
				}
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'sju_klaim','no_klaim',"CL"+this.e_periode.getText().substr(2,2),'00000'));						
				this.e_berkas.setFocus();
				setTipeButton(tbSimpan);			
			}		
		}
		catch(e) {
			alert(e);
		}
	},	
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				setTipeButton(tbSimpan);
				if (this.stsSimpan == 1) this.doClick();
				this.pc1.setActivePage(this.pc1.childPage[2]);		
				this.e_nopolis.setText(this.sg.cells(6,row));
				this.e_nodok.setText(this.sg.cells(0,row) + ' | '+this.sg.cells(1,row));
				this.e_tipe.setText(this.sg.cells(5,row));
				this.e_tglpolis.setText(this.sg.cells(7,row));
				this.e_unit.setText(this.sg.cells(8,row));
				this.e_curr.setText(this.sg.cells(9,row));
				this.e_penanggung.setText(this.sg.cells(3,row));
				this.e_tertanggung.setText(this.sg.cells(4,row));
				this.e_nilai.setText(this.sg.cells(10,row));
				this.e_premi.setText(this.sg.cells(11,row));
				this.e_status.setText(this.sg.cells(2,row));	
				this.kodeTipe = this.sg.cells(12,row);			
				this.e_memo.setText("-");													
				
				var strSQL = "select d.kode_sebab,d.nama from sju_polis_m b "+
				             "inner join sju_tipe a on a.kode_tipe=b.kode_tipe and a.kode_lokasi=b.kode_lokasi "+
							 "inner join sju_sebab d on a.kode_tipe=d.kode_tipe and a.kode_lokasi=d.kode_lokasi "+
				             "where b.no_polis ='"+this.e_nopolis.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'";		
				this.cb_sebab.setSQL(strSQL,["d.kode_sebab","d.nama"],false,["Kode","Nama"],"and","Data Penyebab Klaim",true);

				var strSQL = "select d.kode_obl,d.nama from sju_polis_m b "+
				             "inner join sju_tipe a on a.kode_tipe=b.kode_tipe and a.kode_lokasi=b.kode_lokasi "+
							 "inner join sju_obl d on a.kode_tipe=d.kode_tipe and a.kode_lokasi=d.kode_lokasi "+
				             "where b.no_polis ='"+this.e_nopolis.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'";	
				this.cb_oblos.setSQL(strSQL,["d.kode_obl","d.nama"],false,["Kode","Nama"],"and","Data Object Of Loss",true);


				this.sgUpld.clear();
				var strSQL = "select a.kode_jenis,a.nama from sju_jenisdok_klaim a "+							 
							 "where a.kode_tipe='"+this.kodeTipe+"' and a.kode_lokasi='"+this.app._lokasi+"' ";									 	
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgUpld.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgUpld.appendData([line.kode_jenis, line.nama, '-','-']);
					}
				} else this.sgUpld.clear(1);	

				var strSQL = "select 'NOCLAIM' as status,* from sju_polis_objek where no_polis='"+this.e_nopolis.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";									 	
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.status.toUpperCase(), line.nama,line.alamat,line.no_ref1,line.no_ref2,line.no_ref3,floatToNilai(line.nilai),floatToNilai(line.deduc)]);
					}
				} else this.sg1.clear(1);

			}
		} catch(e) {alert(e);}
	},	
	doGridChange: function(sender, col, row,param1,result, data){
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
    },
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
							this.app._mainForm.bClear.click();

							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doLoad3:function(sender){		
		var strSQL = "select a.no_dok,a.no_dok2, case when y.no_polis is null then 'UNPAID' else 'PAID' end as sts_bayar,d.kode_vendor +' | '+d.nama as vendor,c.kode_cust +' | '+c.nama as cust,e.kode_tipe+' | '+e.nama as tipe,a.no_polis, "+
					"convert(varchar,a.tgl_mulai,103) +' - ' + convert(varchar,a.tgl_selesai,103) as tgl, a.kode_pp+' | '+f.nama as pp,a.kode_curr,a.total,a.n_premi,z.no_klaim, e.kode_tipe "+ 
					"from sju_polis_m a inner join sju_cust c on a.kode_cust = c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
					"                   inner join sju_polis_vendor b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi and b.status = 'LEADER' "+
					"                   inner join sju_vendor d on b.kode_vendor = d.kode_vendor and b.kode_lokasi=d.kode_lokasi "+
					"                   inner join sju_tipe e on a.kode_tipe = e.kode_tipe and a.kode_lokasi=e.kode_lokasi "+
					"                   inner join pp f on a.kode_pp = f.kode_pp and a.kode_lokasi=f.kode_lokasi "+
					"                   inner join sju_polis_termin x on a.no_polis=x.no_polis and a.kode_lokasi=x.kode_lokasi and x.nu=0 "+
					"                   inner join sju_klaim z on a.no_polis=z.no_polis and a.kode_lokasi=z.kode_lokasi "+
					"                   inner join sju_polisbayar_d y on x.no_polis=y.no_polis and y.kode_lokasi=x.kode_lokasi and x.nu=y.nu and x.no_bill=y.no_bill "+					 					
					"where a.kode_cust='"+this.cb_cust.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and z.progress='KLAIM' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);							
	},		
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];		
			this.sg3.appendData([line.no_dok,line.no_dok2,line.sts_bayar.toUpperCase(),line.vendor,line.cust,line.tipe,line.no_polis,line.tgl,line.pp,line.kode_curr,floatToNilai(line.total),floatToNilai(line.n_premi),line.no_klaim,line.kode_tipe]);  
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.stsSimpan = 0;
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[2]);		
				this.e_nb.setText(this.sg3.cells(12,row));
				this.e_nopolis.setText(this.sg3.cells(6,row));
				this.e_nodok.setText(this.sg3.cells(0,row) + ' | '+this.sg3.cells(1,row));
				this.e_tipe.setText(this.sg3.cells(5,row));
				this.e_tglpolis.setText(this.sg3.cells(7,row));
				this.e_unit.setText(this.sg3.cells(8,row));
				this.e_curr.setText(this.sg3.cells(9,row));
				this.e_penanggung.setText(this.sg3.cells(3,row));
				this.e_tertanggung.setText(this.sg3.cells(4,row));
				this.e_nilai.setText(this.sg3.cells(10,row));
				this.e_premi.setText(this.sg3.cells(11,row));
				this.e_status.setText(this.sg3.cells(2,row));	
				this.kodeTipe = this.sg3.cells(13,row);		
										
				var strSQL = "select d.kode_sebab,d.nama from sju_polis_m b "+
				             "inner join sju_tipe a on a.kode_tipe=b.kode_tipe and a.kode_lokasi=b.kode_lokasi "+
							 "inner join sju_sebab d on a.kode_tipe=d.kode_tipe and a.kode_lokasi=d.kode_lokasi "+
				             "where b.no_polis ='"+this.e_nopolis.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'";		
				this.cb_sebab.setSQL(strSQL,["d.kode_sebab","d.nama"],false,["Kode","Nama"],"and","Data Penyebab Klaim",true);

				var strSQL = "select d.kode_obl,d.nama from sju_polis_m b "+
				             "inner join sju_tipe a on a.kode_tipe=b.kode_tipe and a.kode_lokasi=b.kode_lokasi "+
							 "inner join sju_obl d on a.kode_tipe=d.kode_tipe and a.kode_lokasi=d.kode_lokasi "+
				             "where b.no_polis ='"+this.e_nopolis.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'";	
				this.cb_oblos.setSQL(strSQL,["d.kode_obl","d.nama"],false,["Kode","Nama"],"and","Data Object Of Loss",true);

				var strSQL = "select * from sju_klaim where no_klaim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);	
						this.e_berkas.setText(line.no_berkas);						
						this.e_memo.setText(line.keterangan);					
						this.e_estimasi.setText(floatToNilai(line.nilai));
						this.dp_d2.setText(line.tgl_dol);	
						this.dp_d3.setText(line.tgl_tahu);	
						this.e_lokasi.setText(line.lokasi);	
						this.cb_sebab.setText(line.sebab);
						this.cb_oblos.setText(line.kode_obl);															
					}
				}

				this.sgUpld.clear();
				this.deleteFiles = [];
				this.listFiles = new arrayMap();
				var strSQL = "select a.kode_jenis,a.nama,isnull(b.path_file,'-') as no_gambar "+
							 "from sju_jenisdok_klaim a left join sju_klaim_dok b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi and b.no_klaim = '"+this.e_nb.getText()+"' "+
							 "where a.kode_tipe='"+this.kodeTipe+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_jenis";												
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgUpld.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.listFiles.set(line.no_gambar,line.no_gambar); 
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar}]);
					}
				} else this.sgUpld.clear(1);	

				var strSQL = "select 'CLAIM' as status,a.* from sju_polis_objek a inner join sju_klaim_objek b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi and a.nu=b.nu and a.no_ref1=b.no_ref1 "+
							 "where b.no_klaim='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' ";									 	
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.status.toUpperCase(), line.nama,line.alamat,line.no_ref1,line.no_ref2,line.no_ref3,floatToNilai(line.nilai),floatToNilai(line.deduc)]);
					}
				} else this.sg1.clear(1);

			}
		} catch(e) {alert(e);}
	}
});