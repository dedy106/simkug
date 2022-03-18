window.app_saku2_transaksi_kopeg_kbitt_fEditData = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fEditData.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fEditData";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Edit Jurnal KasBank : Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,500], childPage:["Data KasBank","Detail KasBank","Data KPA","Filter Data"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:8,tag:8,
		            colTitle:["No KasBank","Tanggal","Akun","Uraian","Nominal","Tgl Input","User","Periode"],
					colWidth:[[7,6,5,4,3,2,1,0],[70,150,70,100,250,150,80,100]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
					colFormat:[[4],[cfNilai]],					
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-86],colCount:10,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","DRK","Nama DRK","ID"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[60,100,50,100,50,100,250,40,150,80]],					
					columnReadOnly:[true,[1,6,8,9],[0,2,3,4,5,7]],
					buttonStyle:[[0,2,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter1"],ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:true,defaultRow:1});					
		this.e_debet = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,11,200,20],caption:"Total Debet", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_kredit = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,12,200,20],caption:"Total Kredit", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[3],{bound:[20,11,100,18],caption:"Dr Tanggal", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[3],{bound:[120,11,100,18]}); 		
		this.l_tgl3 = new portalui_label(this.pc1.childPage[3],{bound:[20,12,100,18],caption:"Sd Tanggal", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[3],{bound:[120,12,100,18]}); 				
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,11,200,20],caption:"No KasBank",tag:9});
		this.e_nominal = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,12,200,20],caption:"Nominal", tipeText:ttNilai, text:"0",tag:9});				
		this.bCari = new button(this.pc1.childPage[3],{bound:[230,12,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();		
			this.flagGarFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;								
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fEditData.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fEditData.implement({
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
					sql.add("delete from kas_j where no_kas ='"+this.nokas+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from it_aju_d where no_aju ='"+this.noaju+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti ='"+this.noaju+"' and kode_lokasi='"+this.app._lokasi+"' and modul='ITKBAJU'");
					
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								var j = i+1;
								sql.add("insert into it_aju_d(no_aju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.noaju+"','"+this.nokas+"',getdate(),"+j+",'"+this.sg1.cells(0,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(2,i)+"','IDR',1,"+parseNilai(this.sg1.cells(4,i))+","+parseNilai(this.sg1.cells(4,i))+",'"+this.sg1.cells(5,i)+"','"+this.sg1.cells(7,i)+"','"+this.app._lokasi+"','ITKBAJU','EDITDATA','"+this.periode+"','"+this.app._userLog+"',getdate())");
							}
						}
					}					
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) "+
							"select '"+this.nokas+"',a.no_aju,b.tanggal,a.no_urut,a.kode_akun,a.keterangan,a.dc,a.nilai,a.kode_pp,a.kode_drk,'-','-',a.kode_lokasi,'KBITAJU','EDITDATA',a.periode,'IDR',1,'"+this.app._userLog+"',getdate(),'-' "+
							"from it_aju_d a inner join kas_m b on a.no_dokumen=b.no_kas and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_aju='"+this.noaju+"' and a.kode_lokasi='"+this.app._lokasi+"'");
							
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select no_dokumen,'ITKBAJU',kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,dc,0,sum(nilai) "+
							"from kas_j where kode_drk <> '-' and kode_pp <> '-' and kode_akun <> '-' and no_kas ='"+this.nokas+"' and kode_lokasi='"+this.app._lokasi+"' "+
							"group by no_dokumen,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,dc");
										
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),undefined);
					this.sg1.clear(1); this.sg2.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);										
					setTipeButton(tbSimpan);
				break;
			case "simpan" :									
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																
				this.sg1.validasi();				
				this.doHitungGar();				
				if (this.flagGarFree == "0") {
					this.dataAkunGar = {rs:{rows:[]}};	
					var data = this.dbLib.getDataProvider("select kode_akun from masakun where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						this.dataAkunGar = data;
					}				
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (!this.sg1.rowValid(i)){
							var isKosong = true;
							for (var j=0;j < this.sg1.getColCount();j++){
								if (this.sg1.cells(j,i) != "") {
									isKosong = false;
									break;
								}
							}						
							if (!isKosong) {
								system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
								return false;
							}
						}
						else {
							for (var j=0;j<this.dataAkunGar.rs.rows.length;j++){
								line = this.dataAkunGar.rs.rows[j];
								if (line.kode_akun == this.sg1.cells(0,i) && this.sg1.cells(8,i) == "-") {
									var k = i+1;
									system.alert(this,"Transaksi tidak valid.","Akun Anggaran Harus diisi DRK.[Baris : "+k+"]");
									return false;						
								}
							}
						}
					}				
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (nilaiToFloat(this.sg2.cells(7,i))>0 && nilaiToFloat(this.sg2.cells(6,i)) < nilaiToFloat(this.sg2.cells(7,i))) {
							var k =i+1;
							system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
							return false;						
						}
					}
				}
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Debet - Kredit tidak balance.");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		
	},				
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) != "") {			
			this.pc1.setActivePage(this.pc1.childPage[1]);							
			this.nokas = this.sg.cells(0,row);
			var data = this.dbLib.getDataProvider(
						"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.periode,a.no_urut,a.no_dokumen "+ 
						"from kas_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"             inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"             left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+												
						"where a.no_kas = '"+this.sg.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					//colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","DRK","Nama DRK"],
					this.sg1.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,line.no_urut]);
				}
				this.periode = line.periode;
				this.noaju = line.no_dokumen;
			} else this.sg1.clear(1);			
		}
	},		
	doCari:function(sender){				
		var filter = " where a.posted in ('X','F') and a.tanggal between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='KBITAJU' ";		
		if (this.e_nobukti.getText()!="") filter = " and a.no_kas='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		if (nilaiToFloat(this.e_nominal.getText())!=0) filter = " and a.nilai="+nilaiToFloat(this.e_nominal.getText())+" and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='KBITAJU' ";		
		
		var strSQL = "select no_kas,convert(varchar,a.tanggal,103) as tanggal,a.akun_kb+' - '+isnull(c.nama,'-') as akun,a.keterangan,a.nilai,convert(varchar,a.tgl_input,103) as tgl_input,d.nik+' - '+d.nama as nik_user,a.periode "+
		             "from kas_m a "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 
					 "inner join hakakses d on d.nik=a.nik_user and a.kode_lokasi=d.kode_lokasi "+					 
					 "inner join masakun c on a.akun_kb=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+filter;					 					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];										
			this.sg.appendData([line.no_kas,line.tanggal,line.akun,line.keterangan,floatToNilai(line.nilai),line.tgl_input,line.nik_user,line.periode]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	
	doChangeCell1: function(sender, col, row){
		if (col == 2 || col == 4) {			
			if (this.sg1.cells(2,row) != "" && this.sg1.cells(4,row) != "") {
				this.sg1.validasi();			
			}
		}
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);					
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}
			}
		}
		if (col == 5) {
			if (sender.cells(5,row) != "") {
				var pp = this.dataPP.get(sender.cells(5,row));
				if (pp) sender.cells(6,row,pp);
				else {
					if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode PP "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}
			}
		}
		if (col == 7) {
			if (sender.cells(7,row) != "") {
				var drk = this.dataDRK.get(sender.cells(7,row));
				if (drk) sender.cells(8,row,drk);
				else {
					if (trim(sender.cells(7,row)) != "") system.alert(this,"Kode DRK "+sender.cells(7,row)+" tidak ditemukan","Inputkan kode lainnya.","checkDRK");                
					sender.cells(7,row,"");
					sender.cells(8,row,"");
				}
			}
		}		
		sender.onChange.set(this,"doChangeCell1");			
	},	
	doNilaiChange1: function(){
		try{			
			var debet = kredit = 0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != ""){
					if (this.sg1.cells(2,i).toUpperCase() == "C") {
						kredit += nilaiToFloat(this.sg1.cells(4,i));
					}
					else {
						debet += nilaiToFloat(this.sg1.cells(4,i));
					}
				}
			}									
			this.e_debet.setText(floatToNilai(debet));			
			this.e_kredit.setText(floatToNilai(kredit));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doCellEnter1: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg1.cells(2,row) == ""){
						this.sg1.setCell(2,row,"D");						
					}
				break;			
			case 3 : 
					if (this.sg1.cells(3,row) == ""){
						if (row == 0) this.sg1.setCell(3,row,this.e_ket.getText());
						else this.sg1.setCell(3,row,this.sg1.cells(3,(row-1)) );
					}
				break;
			case 5 : 
					if ((this.sg1.cells(5,row) == "") && (row > 0)) {
						this.sg1.setCell(5,row,this.sg1.cells(5,(row-1)));
						this.sg1.setCell(6,row,this.sg1.cells(6,(row-1)));
					}
					else {
						this.sg1.setCell(5,row,this.app._kodePP);
						this.sg1.setCell(6,row,this.app._namaPP);
					}
				break;
		}
	},
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select a.kode_akun,a.nama    from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(a.kode_akun)    from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  ["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}	
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 7){					
					var vSts = true;
					var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.periode.substr(0,4)+"%' and b.kode_akun='"+this.sg1.cells(0,row)+"' and b.kode_pp = '"+this.sg1.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.jml != 0) var vSts = false; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
							"select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.periode.substr(0,4)+"%' and b.kode_akun='"+this.sg1.cells(0,row)+"' and b.kode_pp = '"+this.sg1.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
							"select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.periode.substr(0,4)+"%' and b.kode_akun='"+this.sg1.cells(0,row)+"' and b.kode_pp = '"+this.sg1.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
							["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],vSts);
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doHitungGar: function(){
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg1.getRowCount();i++){
			if (this.sg1.rowValid(i) && this.sg1.cells(5,i) != "-" && this.sg1.cells(7,i)!= "-"){				
				if (this.sg1.cells(2,i) == "D") nilai = nilaiToFloat(this.sg1.cells(4,i));
				else nilai = nilaiToFloat(this.sg1.cells(4,i)) * -1;				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg1.cells(0,i) == this.sg2.cells(0,j) && this.sg1.cells(5,i) == this.sg2.cells(2,j) && this.sg1.cells(7,i) == this.sg2.cells(4,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.sg1.cells(0,i),this.sg1.cells(1,i),this.sg1.cells(5,i),this.sg1.cells(6,i),this.sg1.cells(7,i),this.sg1.cells(8,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(7,idx));
					total = total + nilai;
					this.sg2.setCell(7,idx,total);
				}
			}
		}
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(4,i)+"','"+this.periode+"','"+this.noaju+"') as gar ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(6,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(7,i));
				this.sg2.cells(8,i,floatToNilai(sls));
			}
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.nokas+")","");							
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),undefined);
			this.sg1.clear(1); this.sg2.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);					
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});