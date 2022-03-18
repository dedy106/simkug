window.app_saku2_transaksi_kopeg_proyek_fAkruPiuTermin = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_proyek_fAkruPiuTermin.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_proyek_fAkruPiuTermin";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Piutang Project: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Project","Detail Jurnal","Filter Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:13,tag:9,
		            colTitle:["ID Project","No SPK/PKS","PP","Customer","Nama Project","Tgl Mulai","Tgl Selesai","Jatuh Tempo","Uraian Termin","Nilai","PPN","ID Cust","ID Termin"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[60,60,80,100,150,70,70,70,250,200,150,150,100]],
					readOnly:true,colFormat:[[9,10,12],[cfNilai,cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"No Bukti",readOnly:true,tag:1});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]}); 
		this.e_dok = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,300,20],caption:"No Dokumen", maxLength:100,tag:1});						
		this.e_ket = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,500,20],caption:"Deskripsi", maxLength:150,tag:1});										
		this.e_id = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,500,20],caption:"ID/Dok Project ", readOnly:true ,tag:1});						
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[780,16,200,20],caption:"Nilai Termin", tag:1, tipeText:ttNilai, text:"0",readOnly:true,tag:1});				
		this.e_nama = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,500,20],caption:"Nama Project ", readOnly:true ,tag:1});						
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[1],{bound:[780,15,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0",readOnly:true,tag:1});				
		this.cb_akun = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Akun Piutang", multiSelection:false, maxLength:10, tag:2});										
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[780,13,200,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0",readOnly:true,tag:1});				
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-180],colCount:9,tag:1,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,50,100,50,100,250,40,150,80]],					
					columnReadOnly:[true,[1,6,8],[0,2,3,4,5,7]],
					buttonStyle:[[0,2,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		this.e_totaldc = new saiLabelEdit(this.sgn,{bound:[780,2,200,20],caption:"Total DC", tag:1, tipeText:ttNilai, text:"0",readOnly:true,tag:1});				
		
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag = '003' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun Piutang",true);			
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PRPDD','HUTPPN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																						
					if (line.kode_spro == "HUTPPN") this.akunPPN = line.flag;			
					if (line.kode_spro == "PRPDD") this.akunPDD = line.flag;			
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_proyek_fAkruPiuTermin.extend(window.portalui_childForm);
window.app_saku2_transaksi_kopeg_proyek_fAkruPiuTermin.implement({	
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
					var totPDD = 0;
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							if (this.akunPDD == this.sg.cells(0,i)) totPDD += nilaiToFloat(this.sg.cells(4,i));							
						}
					}							
					sql.add("insert into pr_piutang_m(no_piutang,kode_lokasi,no_dokumen,tanggal,keterangan,no_proyek,kode_cust,kode_curr,kurs,nik_app,kode_pp,nilai,periode,nik_user,tgl_input,akun_piutang,posted,nilai_ppn,nilai_pdd,akun_pdd,no_app) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.idProject+"','"+this.kodeCust+"','IDR',1,'"+this.app._userLog+"','"+this.app._kodePP+"',"+nilaiToFloat(this.e_total.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_akun.getText()+"','F',"+parseNilai(this.e_ppn.getText())+","+totPDD+",'"+this.akunPDD+"','-')");									
					sql.add("insert into pr_piutang_j(no_piutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D','IDR',1,"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_total.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PIUPROJECT','PIU','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");					
					if (nilaiToFloat(this.e_ppn.getText()) != 0) {
						sql.add("insert into pr_piutang_j(no_piutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',99,'"+this.akunPPN+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_ppn.getText())+","+parseNilai(this.e_ppn.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PIUPROJECT','HUTPPN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					}					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){															
								var j = i+1;
								sql.add("insert into pr_piutang_j(no_piutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i)+"','IDR',1,"+parseNilai(this.sg.cells(4,i))+","+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"','"+this.sg.cells(7,i)+"','"+this.app._lokasi+"','PIUPROJECT','PDPT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");								
							}
						}
					}					
					sql.add("insert into pr_piutang_d (no_piutang,kode_lokasi,no_proyek,nu,nilai ,nilai_pdd,nilai_ppn,kode_akun,dc,modul) values "+
					       "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.idProject+"','"+this.idTermin+"',"+nilaiToFloat(this.e_total.getText())+","+totPDD+","+nilaiToFloat(this.e_ppn.getText())+",'"+this.cb_akun.getText()+"','D','AKRU')");
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
				this.dataAkunGar = {rs:{rows:[]}};
				var data = this.dbLib.getDataProvider("select kode_akun from masakun where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunGar = data;
				}
				for (var i=0;i < this.sg.getRowCount();i++){					
					if (!this.sg.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg.getColCount();j++){
							if (this.sg.cells(j,i) != "") {
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
							if (line.kode_akun == this.sg.cells(0,i) && this.sg.cells(7,i) == "-") {		
								var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Akun Anggaran Harus diisi DRK.[Baris : "+k+"]");
								return false;						
							}
						}
					}
				}
				if (nilaiToFloat(this.e_totaldc.getText()) != nilaiToFloat(this.e_nilai.getText())) {
					system.alert(this,"Transaksi Jurnal tidak valid.","Total Jurnal dan Nilai Termin tidak sama.");
					return false;						
				}				
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else 
			    this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;							
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}			
		this.doLoad();		
		var sql = new server_util_arrayList();			
		//sql.add("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('022') and a.kode_lokasi='"+this.app._lokasi+"' "+
		//        "union "+
		//		"select a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi where kode_spro in ('PRPDD','HUTPPN') and a.kode_lokasi='"+this.app._lokasi+"'");		
		sql.add("select a.flag as kode_akun,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi where kode_spro in ('PRPDD','HUTPPN') and a.kode_lokasi='"+this.app._lokasi+"'");
		sql.add("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'");		
		this.dbLib.getMultiDataProviderA(sql);		
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.doLoad();
			this.standarLib.clearByTag(this, new Array("1"),undefined);							
			setTipeButton(tbAllFalse);
			this.sg.clear(1);
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" ) {				
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pr_piutang_m","no_piutang",this.app._lokasi+"-PU"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);				
		}		
	},	
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {							
				this.doClick();
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				
				this.e_dok.setText("-");
				this.e_ket.setText(this.sg1.cells(8,row));
				this.e_nilai.setText(this.sg1.cells(9,row));
				this.e_ppn.setText(this.sg1.cells(10,row));
				this.e_id.setText(this.sg1.cells(0,row)+" / "+this.sg1.cells(1,row));
				this.e_nama.setText(this.sg1.cells(4,row));
				var total = nilaiToFloat(this.sg1.cells(10,row)) + nilaiToFloat(this.sg1.cells(9,row));
				this.e_total.setText(floatToNilai(total));
				
				this.idProject = this.sg1.cells(0,row);
				this.kodeCust = this.sg1.cells(11,row);
				this.idTermin = nilaiToFloat(this.sg1.cells(12,row));
			}
		} catch(e) {alert(e);}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){																					
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
						}else system.info(this,result,"");
	    			break;															
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){							
							this.dataAkun = new portalui_arrayMap();
							this.dataPP = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataAkun.set(line.kode_akun, line.nama);
								}
							}
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];
									this.dataPP.set(line.kode_pp, line.nama);
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
			this.doLoad();
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			setTipeButton(tbAllFalse);
			this.sg.clear(1);
		} catch(e) {
			alert(e);
		}
	},	
	doLoad:function(sender){						
		var strSQL = "select a.no_proyek,a.kode_cust+' - '+b.nama as cust,a.no_dokumen,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,d.nilai,d.nilai_ppn,a.kode_pp+' - '+c.nama as pp,a.keterangan,convert(varchar,d.due_date,103) as due_date,d.keterangan as uraian,a.kode_cust,d.nu as idtermin "+
		             "from pr_proyek_m a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
					 "                   inner join pp c on a.kode_pp =c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
					 "                   inner join pr_proyek_termin d on a.no_proyek=d.no_proyek and a.kode_lokasi=d.kode_lokasi "+
					 "                   left join (select no_proyek,kode_lokasi,nu,sum(case dc when 'D' then nilai else -nilai end) as nilai_akru from pr_piutang_d where kode_lokasi='"+this.app._lokasi+"' group by no_proyek,kode_lokasi,nu) e on d.no_proyek=e.no_proyek and d.nu=e.nu and d.kode_lokasi=e.kode_lokasi "+
					 "where d.nilai+d.nilai_ppn > isnull(e.nilai_akru,0) and a.flag_aktif in ('1','2') and a.kode_lokasi='"+this.app._lokasi+"' and a.progress='1'  ";		//and d.due_date <= dateadd(s,-1,dateadd(mm,datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},		
	doCari:function(sender){						
		
	},
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_proyek,line.no_dokumen,line.pp,line.cust,line.keterangan,line.tgl_mulai,line.tgl_selesai,line.due_date,line.uraian,floatToNilai(line.nilai),floatToNilai(line.nilai_ppn),line.kode_cust,floatToNilai(line.idtermin)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doChangeCell: function(sender, col, row){
		if (col == 2 || col == 4) {			
			if (this.sg.cells(2,row) != "" && this.sg.cells(4,row) != "") {							
				this.sg.validasi();			
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
			if (this.sg.cells(7,row) != "") {
				var isAda = false;
				var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.jml != 0) isAda = true;
					} 
				}
				var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(5,row)+"' and b.kode_drk = '"+this.sg.cells(7,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg.cells(8,row,line.nama);
					else {
						if (!isAda) this.sg.cells(8,row,"-");
						else {
							this.sg.cells(7,row,"");
							this.sg.cells(8,row,"");
						}
					}
				}
			}
		}		
		sender.onChange.set(this,"doChangeCell");			
	},	
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){										
					if (this.sg.cells(2,i).toUpperCase() == "C") tot += nilaiToFloat(this.sg.cells(4,i));
					else tot -= nilaiToFloat(this.sg.cells(4,i));									
				}
			}									
			this.e_totaldc.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg.cells(2,row) == ""){
						this.sg.setCell(2,row,"C");						
					}
				break;			
			case 3 : 
					if (this.sg.cells(3,row) == ""){
						if (row == 0) this.sg.setCell(3,row,this.e_ket.getText());
						else this.sg.setCell(3,row,this.sg.cells(3,(row-1)) );
					}
				break;
			case 5 : 
					if ((this.sg.cells(5,row) == "") && (row > 0)) {
						this.sg.setCell(5,row,this.sg.cells(5,(row-1)));
						this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
					}
					else {
						this.sg.setCell(5,row,this.app._kodePP);
						this.sg.setCell(6,row,this.app._namaPP);
					}
				break;
		}
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  //"select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('022') and a.kode_lokasi='"+this.app._lokasi+"' union select substring(a.flag,1,20) as kode_akun,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi where kode_spro in ('PRPDD','HUTPPN') and a.kode_lokasi='"+this.app._lokasi+"'",
												  //"select count(*) from (select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('022') and a.kode_lokasi='"+this.app._lokasi+"' union select a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi where kode_spro in ('PRPDD','HUTPPN') and a.kode_lokasi='"+this.app._lokasi+"') a",												  
												  "select substring(a.flag,1,20) as kode_akun,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi where kode_spro in ('PRPDD','HUTPPN') and a.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(*) from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi where kode_spro in ('PRPDD','HUTPPN') and a.kode_lokasi='"+this.app._lokasi+"'",												  
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
					var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.jml != 0) var vSts = false; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
													  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  ["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],vSts);
				}			
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
});