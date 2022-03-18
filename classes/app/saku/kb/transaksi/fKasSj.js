/**
 * @author dweexfuad
 */
window.app_saku_kb_transaksi_fKasSj = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_transaksi_fKasSj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_fKasSj";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Surat Jalan BG/Cek: Input", 0);
		try{	
			uses("portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
			this.lblTgl1 = new portalui_label(this, {
				bound: [20, 32, 101, 20],
				caption: "Tanggal",
				underline: true
			});						
			this.dp_tgl1 = new portalui_datePicker(this, {
				bound: [120, 32, 120, 18]
			});				
	        this.ed_nb = new portalui_saiLabelEdit(this, {
				bound: [20, 78, 230, 20],
				caption: "No Surat Jalan"
			});			
			this.bGen = new portalui_button(this, {
				bound: [256, 78, 80, 20],
				caption: "Gen",
				icon: "url(icon/" + system.getThemes() + "/process.png)"
			});				
			this.ed_desc = new portalui_saiLabelEdit(this, {
				bound: [20, 100, 500, 20],
				caption: "Deskripsi",
				maxLength: 150
			});				
			this.cb_pembuat = new portalui_saiCBBL(this, {
				bound: [20, 166, 185, 20],
				caption: "Approval",
				multiSelection:false,
				sql : ["select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp ='"+this.app._kodePP+"'",["nik","nama"],false,["NIK","Nama"],"and","Daftar Karyawan",true]
			});				
			this.bShow = new portalui_imageButton(this, {
				bound: [205, 166, 22, 22],
				hint: "Tampil Data",
				image: "icon/" + system.getThemes() + "/reload.png"
			});							
			this.ed_cari = new portalui_saiLabelEdit(this, {
				bound: [20, 210, 230, 20],
				caption: "Search By BG/Cek",
				tag: 8
			});		
			
		this.b_cari = new portalui_imageButton(this, {
			bound: [250, 210, 20, 20],
			hint: "Cari",
			image: "icon/" + system.getThemes() + "/tabCont2.png",
			click: [this, "doCariClick"]
		});		
		this.ed_nilai = new portalui_saiLabelEdit(this, {
			bound: [622, 210, 298, 20],
			caption: "Total Pencairan",
			tipeText: ttNilai,
			alignment: alRight,
			readOnly: true
		});				
	    this.p1 = new portalui_panel(this, {
			bound: [20, 232, 900, 240],
			caption: "Daftar Pengeluaran Bank"
		});	    				
    	this.sg1 = new portalui_saiGrid(this.p1, {
			bound: [1, 20, 895, 195],
			colCount: 7,
			colTitle:["Pilih","No Buktikas","No CekBG","Tanggal","Unit","Nilai","Keterangan"],
			colWidth:[[6,5,4,3,2,1,0],[250,100,150,100,150,100,50]],
			colFormat:[[0,5],[cfBoolean, cfNilai]],
			colReadOnly:[true,[1,3,4,5,6],[]]
		});    			
		this.sgNav = new portalui_sgNavigator(this.p1, {
			bound: [1, 215, 897, 25],
			grid: this.sg1,
			border: 0,
			buttonStyle: 3
		});		
		this.rearrangeChild(10,23);
		setTipeButton(tbSimpan);
		this.setTabChildIndex();

			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			uses("util_addOnLib");
			this.addOnLib=new util_addOnLib();
		
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.bShow.onClick.set(this, "showClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sgNav.onPager.set(this, "doSelectedPage");
			this.ed_period= this.dp_tgl1.getYear().toString()+(this.dp_tgl1.getMonth() < 10 ? "0" : "") +this.dp_tgl1.getMonth();
			this.standarLib.clearByTag(this,["0","1"],this.dp_tgl1);				
			this.baris = this.app._baris;									
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_fKasSj.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_fKasSj.implement({
	mainButtonClick : function(sender){
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
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, new Array("0","8"),this.dp_tgl1);				
					this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
					this.sg1.clear(); this.sg1.appendRow();
				}
				break;
				
			case "simpan" :
				var sql = new server_util_arrayList();
				sql.add("insert into kas_sj_m(no_sj, kode_lokasi, tanggal, keterangan, tgl_input, nik_user)"+
						"	values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_tgl1.getDateString()+"','"+this.ed_desc.getText()+"',now(), '"+this.app._userLog+"') ");
				for (var i=0;i< this.sg1.getRowCount();i++){
					if (this.sg1.cells(0,i) == "true"){
						sql.add("insert into kas_sj_d(no_sj, kode_lokasi, no_buktikas)values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(1,i)+"')");
						sql.add("update kas_m set no_bg =  '"+this.sg1.cells(2,i)+"' where no_kas = '"+this.sg1.cells(1,i)+"' ");
					}
				}				
				this.dbLib.execArraySQL(sql);
				break;
			case "simpancek" : this.simpan();
				break;
		}
	},
	pAllClick: function(sender){		
	},
	doCariClick: function(sender){
		for (var i=0; i < this.sg1.rows.getLength(); i++){
			if (this.sg1.cells(2,i) == this.ed_cari.getText()) {
				this.sg1.goToRow(i);
				break;
			}
		}
	},
	doSelectedPage: function(sender, page){
		//this.dbLib.listData(this.scriptSql, page, this.baris);
	},
	showClick:	function(sender){
		try
		{
			this.scriptSql = "select 'FALSE' as status,a.no_kas, a.no_bg,date_format(a.tanggal,'%d-%m-%Y')as tgl, b.nama, a.nilai, a.keterangan from kas_m a "+
				" inner join pp b on b.kode_pp = a.kode_pp and b.kode_lokasi = a.kode_lokasi "+
				" left outer join kas_sj_d c on c.no_buktikas = a.no_kas and c.kode_lokasi = a.kode_lokasi "+
				" where c.no_buktikas is null and a.kode_lokasi = '"+this.app._lokasi+"' ";
			var pageCount = this.dbLib.getRowCount("select count(*) as tot from kas_m a "+
				" inner join pp b on b.kode_pp = a.kode_pp and b.kode_lokasi = a.kode_lokasi "+
				" left outer join kas_sj_d c on c.no_buktikas = a.no_kas and c.kode_lokasi = a.kode_lokasi "+
				" where c.no_buktikas is null and a.kode_lokasi = '"+this.app._lokasi+"'");
			this.sg1.clear();
			var data = this.dbLib.getDataProvider(this.scriptSql,true);
			if (typeof data != "string"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i]; 
					this.sg1.appendData([line.status, line.no_kas, line.no_bg, line.tgl, line.nama, floatToNilai(line.nilai), line.keterangan]);
				}
			}else throw(data);
			this.sg1.frame.scrollTop = 0;
			this.sg1.validasi();
			if (this.sg1.getRowCount() == 0) this.sg1.appendRow();
			this.sgNav.setTotalPage(pageCount);
			this.sgNav.rearrange();
			this.sgNav.activePage = 0;	
			this.sgNav.setButtonStyle(3);
			if (pageCount > 0)
			{
				if (this.sgNav.imgBtn1 != undefined)
					this.sgNav.setSelectedPage(this.sgNav.imgBtn1);
			}	
		}catch (e)
		{
			alert(e);
		}
	},
	genClick: function(sender){
		try
		{
			if ((this.ed_period) )
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kas_sj_m','no_sj',this.app._lokasi+"-"+this.dp_tgl1.getYear()+""+(this.dp_tgl1.getMonth()< 10 ?"0":"")+this.dp_tgl1.getMonth()+".",'0000'));
				this.ed_desc.setFocus();
			}
		}
		catch (e)
		{
			alert(e);
		}
	},
	doSelect: function(sender, year, month, day){
		if (month < 10)
			month = "0"+month;
		this.ed_period= year.toString()+month;
	},
	doEditChange: function(sender){		
	},
	FindBtnClick: function(sender, event){
		try
		{			
			if (sender == this.cb_pembuat) 
			{   
			    this.standarLib.showListData(this, "Daftar Petugas Cashier",this.cb_pembuat,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_pp ='"+this.app._kodePP+"'",
											  "select count(nik) from karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_pp ='"+this.app._kodePP+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);
			}
		}
		catch(e)
		{
			alert(e);
		}
	},
	doNilaiChange: function(){
		try
		{
			var tot = 0;		
			for (var i = 0; i < this.sg1.rows.getLength();i++)
			{
				if (this.sg1.getCell(4,i) != "")
				{
					if (this.sg1.getCell(0, i) == "true")					
						tot += nilaiToFloat(this.sg1.getCell(4,i));			
				}
			}
			this.ed_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_kb_transaksi_fKasSj]::doNilaiChange:"+e);
		}
	},
	doCellExit: function(){
		this.sg1.validasi();
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
					if (result.toLowerCase().search("error") == -1)					
					{						
						this.app._mainForm.pesan(2,"Transaksi sukses tersimpan dengan no bukti :("+ this.ed_nb.getText()+")");						
						var title = new server_util_arrayList();			
						title.add("No SJ");title.add("Tanggal");title.add("No BK");title.add("BG/Cek");title.add("Keterangan");title.add("Tgl Transaksi");title.add("Unit");title.add("Nilai Bayar");
						var width = new server_util_arrayList();			
						width.add(100);width.add(90);width.add(150);width.add(150);width.add(250);width.add(100);width.add(150);width.add(100);
						var fieldType = new server_util_arrayList();			
						fieldType.add("S");fieldType.add("S");fieldType.add("S");fieldType.add("S");fieldType.add("S");fieldType.add("D");fieldType.add("S");fieldType.add("N");
						var groupBy = new server_util_arrayList();			
						groupBy.add("no_sj");groupBy.add("tanggal");
						var groupHeader = new server_util_arrayList();			
						groupHeader.add("no_sj");
						var summary = new server_util_arrayList();			
						summary.add("N");summary.add("N");summary.add("N");summary.add("N");summary.add("N");summary.add("N");summary.add("N");summary.add("Y");
						this.dbLib.sqlToHtmlA("select a.no_sj, date_format(a.tanggal,'%d-%m-%Y) as tanggal, b.no_buktikas, c.no_bg, c.keterangan, date_format(c.tanggal,'%d-%m-%Y')as tgl, d.nama, c.nilai "+
							" from kas_sj_m a inner join kas_sj_d b on b.no_sj = a.no_sj and b.kode_lokasi = a.kode_lokasi "+
							" left outer join kas_m c on c.no_kas = b.no_buktikas and c.kode_lokasi = b.kode_lokasi "+						
							" left outer join pp d on d.kode_pp = c.kode_pp and d.kode_lokasi = b.kode_lokasi "+
							"where a.no_sj = '"+this.ed_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",1,100000, title, width, fieldType,true,groupBy, summary, groupHeader);
						this.app._mainForm.bClear.click();              						
					}else system.info(this,result,"");
	    			break;
	      			case "sqlToHtml":
						printPreview(result);
					break;
					case "listData" :
						this.sg1.clear();						 
					break;
	    		}
			}
			catch(e)
			{
				alert(e);
			}
	    }
	}
});