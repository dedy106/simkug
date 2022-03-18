/**
 * @author dweexfuad
 */
window.app_eclaim_master_fParamKurvaS = function(owner) {
	if (owner){
		window.app_eclaim_master_fParamKurvaS.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim_master_fParamKurvaS";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Parameter Kurva S ", 0);			
		uses("datePicker");
		this.ed_proses = new saiCB(this, {
			bound: [20, 30, 200, 20],
			caption: "Proses",			
			change:[this,"doChange"],
			items:["Requirement","Development","Implement"]
		});				
		this.ed_bobot= new saiLabelEdit(this, {bound:[20,11,200,20], caption:"Bobot", text:'0', tipeText:ttNilai});	
		this.lbl = new label(this, {bound:[20,12,100,20], caption:"Jadwal Proyek", underline:true});
		this.dp1 = new datePicker(this,{bound:[120,12,80,18]});
		this.dp2 = new datePicker(this,{bound:[220,12,80,18]});
		this.bTampil = new button(this, {
			bound: [520,12, 80, 20],
			caption: "Tampil",
			click: [this, "doTampil"]
		});
		this.p1 = new panel(this, {
			bound: [20, 11, 600, 230],
			caption: "Waktu"
		});
		this.sg = new saiGrid(this.p1, {
			bound: [1, 20, 598, 180],
			colCount: 4,
			colTitle: "Start, Finish, Minggu, Persen ",
			colWidth: [[3, 2, 1, 0], [80,120,80,80]],			
			colReadOnly:[true,[0,1,2],[]],			
			rowCount: 1,
			tag: 9,										
			colFormat:[[3],[cfNilai]],			
		});					
		this.rearrangeChild(10,23);							
		
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);					
	}
};
window.app_eclaim_master_fParamKurvaS.extend(window.childForm);
window.app_eclaim_master_fParamKurvaS.implement({
	doClose: function(sender){				
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
	doModalResult: function(event, result){				
		try{
			if (result != mrOk) return;
			var sql = new server_util_arrayList();			
			switch(event){
				case "clear" :
					if (result == mrOk){
						this.standarLib.clearByTag(this, new Array("0","1","9"),this.ed_kode);		
						this.ed_proses.setText("Requirement");
						this.sg.clear(1);																		
					}
					
				break;
				case "simpan" :
					sql.add("delete from eclaim_rencana_m where periode = '"+this.app._periode+"' and proses = '"+this.ed_proses.getText()+"' ");
					sql.add("delete from eclaim_rencana_d where periode = '"+this.app._periode+"' and proses = '"+this.ed_proses.getText()+"' ");
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){												
						sql.add("insert into eclaim_rencana_m (proses, bobot, tgl_mulai, tgl_akhir, periode)values"+
							"('"+this.ed_proses.getText()+"',"+this.ed_bobot.getText()+",'"+this.dp1.getDateString()+"','"+this.dp2.getDateString()+"','"+this.app._periode+"' )");
						for (var i=0;i < this.sg.getRowCount(); i++){													
							if(this.sg.rowValid(i)){
								sql.add("insert into eclaim_rencana_d (proses, persen, tgl_mulai, tgl_akhir, periode) "+
									" values('"+this.ed_proses.getText()+"', "+parseNilai(this.sg.cells(3,i)) +",'"+this.sg.getCellDateValue(0,i)+"', '"+this.sg.getCellDateValue(1,i)+"','"+this.app._periode+"' )");
							}
						}						
						this.dbLib.execArraySQL(sql);					
					}
				break;
				case "ubah" :
					
				break;
				case "delete" :
					
				break;
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectedDate: function(sender, y, m, d){       
    },
	doFindBtnClick: function(sender){
				
	},
	doChange: function(sender){
		try{			
			if (sender == this.ed_proses){
				var data = this.dbLib.getDataProvider("select a.bobot, date_format(a.tgl_mulai,'%d-%m-%Y') as tgl_mulai, date_format(a.tgl_akhir,'%d-%m-%Y') as tgl_akhir, "+
					" date_format(b.tgl_mulai, '%d/%m/%Y') as d1, date_format(b.tgl_akhir,'%d/%m/%Y') as d2, concat(date_format(b.tgl_mulai, '%M'),'-', WEEK(b.tgl_mulai,5) - WEEK(DATE_SUB(b.tgl_mulai, INTERVAL DAYOFMONTH(b.tgl_mulai)-1 DAY),5)+1)  as mg, persen "+
					" from eclaim_rencana_m a inner join eclaim_rencana_d b on b.proses = a.proses "+
					" where b.proses = '"+this.ed_proses.getText()+"' order by b.tgl_mulai ",true);
				if (typeof data == "string") throw (data);
				var line, first = true;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					if (first){
						this.ed_bobot.setText(floatToNilai(line.bobot));
						this.dp1.setText(line.tgl_mulai);
						this.dp2.setText(line.tgl_akhir);
					}
					this.sg.appendData([line.d1, line.d2, line.mg, floatToNilai(line.persen)]);
					first = false;
				}
			}
		}catch(e){
			alert(e);
		}
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	    			
	    		}
			}
			catch(e)
			{
				systemAPI.alert("error = "+e,result);
			}
		}else if (sender == this.fileUtil){
        }
	},		
	doTampil: function(sender){		
		try{
			if (sender == this.bTampil){				
				this.sg.clear();
				var d1 = this.dp1.toSysDate();
				var d2 = this.dp2.toSysDate();
				while (d1 < d2){					
					d3 = d1.DateAdd("d",6);
					this.sg.appendData([d1.lclFormat(), d3.lclFormat(), d1.weekOfMonth(),"0"]);
					d1 = d3.DateAdd("d",1);
				}
			}			
		}catch(e){
			alert(e);
		}
	}
});
