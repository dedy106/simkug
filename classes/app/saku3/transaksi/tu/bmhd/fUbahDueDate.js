window.app_saku3_transaksi_tu_bmhd_fUbahDueDate = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_bmhd_fUbahDueDate.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_bmhd_fUbahDueDate";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Ubah DueDate", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Usulan","Data BMHD","Cari Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,
		             colTitle:["No Bukti","No Agenda","Tanggal","Kode Vendor","Nama Vendor","Keterangan","Nilai","Kode PP"],
					colWidth:[[7,6,5,4,3,2,1,0],[60,100,250,200,80,60,100,100]],readOnly:true,
					colFormat:[[6],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Due Date", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,100,18]});
		
		this.cb_pp = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,12,222,20],caption:"Bagian / Unit",tag:1,readOnly:true}); 		
		this.cb_kb = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,13,222,20],caption:"No BuktiKas",tag:1,multiSelection:false,change:[this,"doChange"]});         		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Uraian", readOnly:true});	
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Nilai", tag:1, tipeText:ttNilai, text:"0", readOnly:true});		
		
		this.e_nb2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,200,20],caption:"No KasBank",maxLength:20,tag:9});	
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,200,20],caption:"No Agenda",maxLength:20,tag:9});	
		this.cb_vendor2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,15,200,20],caption:"Kode Vendor", multiSelection:false, maxLength:10, tag:9});	
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,450,20],caption:"Uraian", maxLength:150, tag:9});	
		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,16,80,18],caption:"Cari Data",click:[this,"doCari"]});
		
		this.rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();				
		this.preView = "1";
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_pp.setText(this.app._kodePP);
			this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);
			this.cb_vendor2.setSQL("select kode_vendor,nama from it_vendor where  kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);
		
			this.doLoad();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_bmhd_fUbahDueDate.extend(window.childForm);
window.app_saku3_transaksi_tu_bmhd_fUbahDueDate.implement({	
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
					sql.add("update bmhd_m set due_date ='"+this.dp_d1.getDateString()+"' where no_bmhd ='"+this.cb_kb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					this.doLoad();
					setTipeButton(tbSimpan);					
				break;
			case "simpan" :		
				this.preView = "0";				
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},	
	doChange:function(sender){		
		if (sender == this.cb_kb && this.cb_kb.getText() != "") {
			var strSQL =  "select convert(varchar,isnull(a.due_date,'2015-12-31'),103) as due_date "+ 
						  "from bmhd_m a "+						  
						  "where a.no_bmhd='"+this.cb_kb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){								
					this.dp_d1.setText(line.due_date);
				}
			}

		}
	},		
	doRequestReady: function(sender, methodName, result){		
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){						
							system.info(this,"Transaksi telah sukses tereksekusi","");							
							this.clearLayar();							
						}						
	    			break;
					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(1,row) == "-") {			
				setTipeButton(tbSimpan);				
				this.pc1.setActivePage(this.pc1.childPage[1]);
				this.cb_kb.setText(this.sg1.cells(0,row),this.sg1.cells(5,row));					
				this.cb_pp.setText(this.sg1.cells(7,row));
				this.tglAkru = this.sg1.cells(2,row);
				this.e_ket.setText(this.sg1.cells(5,row));
				this.e_nilai.setText(this.sg1.cells(6,row));	
			}			
		} catch(e) {alert(e);}
	},
	doCari:function(sender){								
		try {
			var filter = "";
			if (this.e_kode2.getText() != "") var filter = filter+" and d.no_aju = '"+this.e_kode2.getText()+"' ";
			if (this.cb_vendor2.getText() != "") var filter = filter+" and a.kode_vendor = '"+this.cb_vendor2.getText()+"' ";
			if (this.e_ket2.getText() != "") var filter = filter+" and d.keterangan like '%"+this.e_ket2.getText()+"%' ";

			var strSQL = "select a.no_bmhd,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_vendor,b.nama as nama_vendor,d.nilai,d.no_aju as no_aju,a.kode_pp "+
					 "from bmhd_m a "+
					//rudi-23/9/19 "inner join karyawan_pp x on a.kode_pp=x.kode_pp and a.kode_lokasi=x.kode_lokasi and x.nik='"+this.app._userLog+"' "+
					 "inner join it_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+					 
					 "inner join bmhd_bayar d on a.no_bmhd=d.no_bmhd and a.kode_lokasi=d.kode_lokasi and d.modul='AJU_M' "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' "+filter+" order by a.no_bmhd ";	
			
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){	
		var strSQL = "select a.no_bmhd,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_vendor,b.nama as nama_vendor,a.nilai-isnull(d.bayar,0) as nilai,'-' as no_aju,a.kode_pp "+
					 "from bmhd_m a "+
					 "inner join karyawan_pp x on a.kode_pp=x.kode_pp and a.kode_lokasi=x.kode_lokasi and x.nik='"+this.app._userLog+"' "+
					 "inner join it_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+					 
					 "left join ("+
					 "			select no_bmhd,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bayar "+
					 "			from  bmhd_bayar "+
					 "			where kode_lokasi='"+this.app._lokasi+"' group by no_bmhd,kode_lokasi "+
					 ") d on a.no_bmhd=d.no_bmhd and a.kode_lokasi=d.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.nilai > isnull(d.bayar,0) order by a.no_bmhd ";		
		
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
			this.sg1.appendData([line.no_bmhd,line.no_aju,line.tgl,line.kode_vendor,line.nama_vendor,line.keterangan,floatToNilai(line.nilai),line.kode_pp]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});